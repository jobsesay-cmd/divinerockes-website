import { prisma } from '@/lib/prisma';

export async function createReportExport(payload: any, userId: string) {
  return prisma.reportExport.create({
    data: {
      requestedById: userId,
      reportType: payload.reportType,
      format: payload.format,
      filters: {
        dateFrom: payload.dateFrom,
        dateTo: payload.dateTo,
      },
      status: 'QUEUED',
    },
  });
}
