import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fail, ok } from '@/lib/api/response';
import { getSessionUser } from '@/lib/auth/session';

type DailyPoint = {
  date: string;
  inquiries: number;
  quotes: number;
  projects: number;
  news: number;
  total: number;
};

type QuoteStatusRow = {
  status: string;
  _count: { _all: number };
};

function subDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - days);
  return copy;
}

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function GET(_: NextRequest) {
  const session = await getSessionUser();
  if (!session?.user) return fail('Unauthorized', 401);

  const now = new Date();
  const from = subDays(now, 29); // last 30 days (inclusive)

  const [
    totalUsers,
    activeUsers,
    totalProjects,
    publishedNews,
    totalInquiries,
    totalQuotes,
    recentInquiries,
    recentQuotes,
    recentProjects,
    recentNews,
    quoteStatusRowsRaw,
  ] = await Promise.all([
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.user.count({ where: { deletedAt: null, isActive: true } }),
    prisma.project.count({ where: { deletedAt: null } }),
    prisma.newsArticle.count({ where: { deletedAt: null, status: 'PUBLISHED' } }),
    prisma.inquiry.count(),
    prisma.quoteRequest.count(),
    prisma.inquiry.findMany({
      where: { createdAt: { gte: from } },
      select: { createdAt: true },
    }),
    prisma.quoteRequest.findMany({
      where: { createdAt: { gte: from } },
      select: { createdAt: true },
    }),
    prisma.project.findMany({
      where: { deletedAt: null, createdAt: { gte: from } },
      select: { createdAt: true },
    }),
    prisma.newsArticle.findMany({
      where: { deletedAt: null, createdAt: { gte: from } },
      select: { createdAt: true },
    }),
    prisma.quoteRequest.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
  ]);

  const quoteStatusRows = quoteStatusRowsRaw as unknown as QuoteStatusRow[];

  const quoteByStatus = quoteStatusRows.reduce<Record<string, number>>(
    (acc: Record<string, number>, row: QuoteStatusRow) => {
      acc[row.status] = row._count._all;
      return acc;
    },
    {},
  );

  const pointsMap = new Map<string, DailyPoint>();
  for (let i = 0; i < 30; i += 1) {
    const d = subDays(now, 29 - i);
    const key = toDateKey(d);
    pointsMap.set(key, {
      date: key,
      inquiries: 0,
      quotes: 0,
      projects: 0,
      news: 0,
      total: 0,
    });
  }

  for (const row of recentInquiries) {
    const key = toDateKey(row.createdAt);
    const p = pointsMap.get(key);
    if (p) p.inquiries += 1;
  }

  for (const row of recentQuotes) {
    const key = toDateKey(row.createdAt);
    const p = pointsMap.get(key);
    if (p) p.quotes += 1;
  }

  for (const row of recentProjects) {
    const key = toDateKey(row.createdAt);
    const p = pointsMap.get(key);
    if (p) p.projects += 1;
  }

  for (const row of recentNews) {
    const key = toDateKey(row.createdAt);
    const p = pointsMap.get(key);
    if (p) p.news += 1;
  }

  const activity = Array.from(pointsMap.values()).map((p) => ({
    ...p,
    total: p.inquiries + p.quotes + p.projects + p.news,
  }));

  return ok({
    kpis: {
      totalUsers,
      activeUsers,
      totalProjects,
      publishedNews,
      totalInquiries,
      totalQuotes,
    },
    quoteByStatus,
    activity,
    window: {
      from: toDateKey(from),
      to: toDateKey(now),
      days: 30,
    },
  });
}