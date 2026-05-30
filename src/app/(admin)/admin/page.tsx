import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { DashboardChart } from '@/components/admin/dashboard-chart';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth/session';

type DashboardPayload = {
  kpis: {
    totalUsers: number;
    activeUsers: number;
    totalProjects: number;
    publishedNews: number;
    totalInquiries: number;
    totalQuotes: number;
  };
  quoteByStatus: Record<string, number>;
  activity: Array<{
    date: string;
    inquiries: number;
    quotes: number;
    projects: number;
    news: number;
    total: number;
  }>;
  trends: {
    inquiries: number;
    quotes: number;
    projects: number;
    news: number;
    totalActivity: number;
  };
  window: {
    from: string;
    to: string;
    days: number;
    previousFrom: string;
    previousTo: string;
  };
  generatedAt: string;
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

function pctDelta(current: number, prev: number): number {
  if (prev === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - prev) / prev) * 100);
}

function trendTone(delta: number): 'up' | 'down' | 'flat' {
  if (delta > 0) return 'up';
  if (delta < 0) return 'down';
  return 'flat';
}

async function getDashboardData(): Promise<DashboardPayload | null> {
  const session = await getSessionUser();
  if (!session?.user) return null;

  const now = new Date();

  // Current 30-day window
  const currentFrom = subDays(now, 29);
  const currentTo = now;

  // Previous 30-day window
  const previousTo = subDays(currentFrom, 1);
  const previousFrom = subDays(previousTo, 29);

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
    previousInquiriesCount,
    previousQuotesCount,
    previousProjectsCount,
    previousNewsCount,
    quoteStatusRowsRaw,
  ] = await Promise.all([
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.user.count({ where: { deletedAt: null, isActive: true } }),
    prisma.project.count({ where: { deletedAt: null } }),
    prisma.newsArticle.count({ where: { deletedAt: null, status: 'PUBLISHED' } }),
    prisma.inquiry.count(),
    prisma.quoteRequest.count(),

    prisma.inquiry.findMany({ where: { createdAt: { gte: currentFrom, lte: currentTo } }, select: { createdAt: true } }),
    prisma.quoteRequest.findMany({ where: { createdAt: { gte: currentFrom, lte: currentTo } }, select: { createdAt: true } }),
    prisma.project.findMany({ where: { deletedAt: null, createdAt: { gte: currentFrom, lte: currentTo } }, select: { createdAt: true } }),
    prisma.newsArticle.findMany({ where: { deletedAt: null, createdAt: { gte: currentFrom, lte: currentTo } }, select: { createdAt: true } }),

    prisma.inquiry.count({ where: { createdAt: { gte: previousFrom, lte: previousTo } } }),
    prisma.quoteRequest.count({ where: { createdAt: { gte: previousFrom, lte: previousTo } } }),
    prisma.project.count({ where: { deletedAt: null, createdAt: { gte: previousFrom, lte: previousTo } } }),
    prisma.newsArticle.count({ where: { deletedAt: null, createdAt: { gte: previousFrom, lte: previousTo } } }),

    prisma.quoteRequest.groupBy({ by: ['status'], _count: { _all: true } }),
  ]);

  const quoteStatusRows = quoteStatusRowsRaw as unknown as QuoteStatusRow[];

  const quoteByStatus = quoteStatusRows.reduce<Record<string, number>>((acc, row) => {
    acc[row.status] = row._count._all;
    return acc;
  }, {});

  const pointsMap = new Map<string, { date: string; inquiries: number; quotes: number; projects: number; news: number; total: number }>();

  for (let i = 0; i < 30; i += 1) {
    const d = subDays(currentTo, 29 - i);
    const key = toDateKey(d);
    pointsMap.set(key, { date: key, inquiries: 0, quotes: 0, projects: 0, news: 0, total: 0 });
  }

  for (const row of recentInquiries) {
    const p = pointsMap.get(toDateKey(row.createdAt));
    if (p) p.inquiries += 1;
  }
  for (const row of recentQuotes) {
    const p = pointsMap.get(toDateKey(row.createdAt));
    if (p) p.quotes += 1;
  }
  for (const row of recentProjects) {
    const p = pointsMap.get(toDateKey(row.createdAt));
    if (p) p.projects += 1;
  }
  for (const row of recentNews) {
    const p = pointsMap.get(toDateKey(row.createdAt));
    if (p) p.news += 1;
  }

  const activity = Array.from(pointsMap.values()).map((p) => ({
    ...p,
    total: p.inquiries + p.quotes + p.projects + p.news,
  }));

  const currentInquiriesCount = recentInquiries.length;
  const currentQuotesCount = recentQuotes.length;
  const currentProjectsCount = recentProjects.length;
  const currentNewsCount = recentNews.length;

  const currentTotalActivity = currentInquiriesCount + currentQuotesCount + currentProjectsCount + currentNewsCount;
  const previousTotalActivity = previousInquiriesCount + previousQuotesCount + previousProjectsCount + previousNewsCount;

  return {
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
    trends: {
      inquiries: pctDelta(currentInquiriesCount, previousInquiriesCount),
      quotes: pctDelta(currentQuotesCount, previousQuotesCount),
      projects: pctDelta(currentProjectsCount, previousProjectsCount),
      news: pctDelta(currentNewsCount, previousNewsCount),
      totalActivity: pctDelta(currentTotalActivity, previousTotalActivity),
    },
    window: {
      from: toDateKey(currentFrom),
      to: toDateKey(currentTo),
      days: 30,
      previousFrom: toDateKey(previousFrom),
      previousTo: toDateKey(previousTo),
    },
    generatedAt: new Date().toISOString(),
  };
}

function TrendBadge({ delta }: { delta: number }) {
  const tone = trendTone(delta);
  const color =
    tone === 'up'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : tone === 'down'
      ? 'bg-rose-50 text-rose-700 border-rose-200'
      : 'bg-slate-50 text-slate-700 border-slate-200';

  const sign = delta > 0 ? '+' : '';

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${color}`}>
      {sign}
      {delta}%
    </span>
  );
}

function StatCard({
  label,
  value,
  href,
  hint,
  delta,
}: {
  label: string;
  value: number | string;
  href?: string;
  hint?: string;
  delta?: number;
}) {
  const body = (
    <Card className="p-4 transition hover:shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-slate-500">{label}</p>
        {typeof delta === 'number' ? <TrendBadge delta={delta} /> : null}
      </div>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </Card>
  );

  if (href) return <Link href={href}>{body}</Link>;
  return body;
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  if (!data) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Card className="p-5">
          <p className="text-sm text-rose-600">
            Unable to load dashboard statistics right now. Please refresh or verify API/auth setup.
          </p>
        </Card>
      </div>
    );
  }

  const { kpis, quoteByStatus, activity, trends, window: activityWindow, generatedAt } = data;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-slate-600">
            Live operational overview ({activityWindow.from} → {activityWindow.to})
          </p>
        </div>
        <p className="text-xs text-slate-500">
          Last updated: {new Date(generatedAt).toLocaleString()}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Users" value={kpis.totalUsers} href="/admin/users" hint={`Active: ${kpis.activeUsers}`} />
        <StatCard label="Projects" value={kpis.totalProjects} href="/admin/projects" delta={trends.projects} />
        <StatCard label="Published News" value={kpis.publishedNews} href="/admin/news" delta={trends.news} />
        <StatCard label="Inquiries" value={kpis.totalInquiries} href="/admin/inquiries" delta={trends.inquiries} />
        <StatCard label="Quotes" value={kpis.totalQuotes} href="/admin/inquiries" delta={trends.quotes} />
        <StatCard
          label="Quote Approval Rate"
          value={
            kpis.totalQuotes > 0
              ? `${Math.round(((quoteByStatus.APPROVED ?? 0) / kpis.totalQuotes) * 100)}%`
              : '0%'
          }
          hint={`Approved: ${quoteByStatus.APPROVED ?? 0}`}
        />
      </div>

      <Card className="space-y-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Activity (Last 30 Days)</h2>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>Inquiries + Quotes + Projects + News</span>
            <TrendBadge delta={trends.totalActivity} />
          </div>
        </div>

        <DashboardChart points={activity.map((d) => ({ date: d.date, total: d.total }))} />

        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Total activity
          </span>
          <span>Previous window: {activityWindow.previousFrom} → {activityWindow.previousTo}</span>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <h3 className="mb-3 text-base font-semibold">Quote Status Breakdown</h3>
          <div className="space-y-2 text-sm">
            {Object.keys(quoteByStatus).length === 0 ? (
              <p className="text-slate-500">No quotes yet.</p>
            ) : (
              Object.entries(quoteByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between rounded border px-3 py-2">
                  <span className="font-medium text-slate-700">{status}</span>
                  <span className="text-slate-900">{count}</span>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="mb-3 text-base font-semibold">Quick Actions</h3>
          <div className="grid gap-2 text-sm">
            <Link className="rounded border px-3 py-2 hover:bg-slate-50" href="/admin/users">
              Manage Users
            </Link>
            <Link className="rounded border px-3 py-2 hover:bg-slate-50" href="/admin/projects">
              Manage Projects
            </Link>
            <Link className="rounded border px-3 py-2 hover:bg-slate-50" href="/admin/news">
              Manage News
            </Link>
            <Link className="rounded border px-3 py-2 hover:bg-slate-50" href="/admin/inquiries">
              Manage Inquiries & Quotes
            </Link>
            <Link className="rounded border px-3 py-2 hover:bg-slate-50" href="/admin/reports">
              Reports
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}