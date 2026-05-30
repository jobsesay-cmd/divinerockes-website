import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { prisma } from '@/lib/prisma';

type ListReportExportsParams = {
  page: number;
  pageSize: number;
  status?: string;
  reportType?: string;
};

type ProcessNextReportResult =
  | { processed: false; reason: 'NO_QUEUED_REPORTS' }
  | { processed: true; id: string; status: 'COMPLETED' | 'FAILED'; fileUrl?: string; error?: string };

export async function createReportExport(payload: any, userId: string) {
  return prisma.reportExport.create({
    data: {
      requestedById: userId,
      reportType: payload.reportType,
      format: payload.format,
      filters: {
        dateFrom: payload.dateFrom ?? null,
        dateTo: payload.dateTo ?? null,
      },
      status: 'QUEUED',
    },
  });
}

export async function listReportExports({
  page,
  pageSize,
  status,
  reportType,
}: ListReportExportsParams) {
  const where: {
    status?: string;
    reportType?: string;
  } = {};

  if (status) where.status = status;
  if (reportType) where.reportType = reportType;

  const [total, items] = await Promise.all([
    prisma.reportExport.count({ where }),
    prisma.reportExport.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        requestedBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    }),
  ]);

  return { total, items };
}

/**
 * Manual processor:
 * - picks oldest QUEUED/PENDING row
 * - marks PROCESSING
 * - writes a minimal CSV/JSON file into /public/exports
 * - marks COMPLETED with fileUrl (or FAILED on error)
 */
export async function processNextQueuedReport(): Promise<ProcessNextReportResult> {
  const next = await prisma.reportExport.findFirst({
    where: {
      status: { in: ['QUEUED', 'PENDING'] },
    },
    orderBy: { createdAt: 'asc' },
  });

  if (!next) {
    return { processed: false, reason: 'NO_QUEUED_REPORTS' };
  }

  await prisma.reportExport.update({
    where: { id: next.id },
    data: { status: 'PROCESSING' },
  });

  try {
    const ext = next.format?.toLowerCase() === 'json' ? 'json' : 'csv';
    const fileName = `${next.id}.${ext}`;
    const exportsDir = path.join(process.cwd(), 'public', 'exports');

    await mkdir(exportsDir, { recursive: true });

    const now = new Date().toISOString();

    let content = '';
    if (ext === 'json') {
      content = JSON.stringify(
        {
          generatedAt: now,
          reportExportId: next.id,
          reportType: next.reportType,
          format: next.format,
          filters: next.filters ?? null,
          note: 'Minimal manual export payload. Replace with real domain data extraction.',
        },
        null,
        2,
      );
    } else {
      content = [
        'generatedAt,reportExportId,reportType,format,filters,note',
        `"${now}","${next.id}","${next.reportType}","${next.format}","${JSON.stringify(
          next.filters ?? {},
        ).replaceAll('"', '""')}","Minimal manual export payload. Replace with real domain data extraction."`,
      ].join('\n');
    }

    const absPath = path.join(exportsDir, fileName);
    await writeFile(absPath, content, 'utf8');

    const fileUrl = `/exports/${fileName}`;

    await prisma.reportExport.update({
      where: { id: next.id },
      data: {
        status: 'COMPLETED',
        fileUrl,
        completedAt: new Date(),
      },
    });

    return { processed: true, id: next.id, status: 'COMPLETED', fileUrl };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown processing error';

    await prisma.reportExport.update({
      where: { id: next.id },
      data: {
        status: 'FAILED',
        completedAt: new Date(),
      },
    });

    return { processed: true, id: next.id, status: 'FAILED', error: message };
  }
}