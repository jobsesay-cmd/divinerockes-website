import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function ReportsPage() {
  return (
    <Card>
      <h1 className="mb-3 text-2xl font-bold">Reports & Export</h1>
      <p className="mb-4 text-slate-700">Generate monthly inquiry, project, and performance exports from the reporting API.</p>
      <Link href="/api/reports/export?format=csv" className="inline-flex rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">Download CSV Export</Link>
    </Card>
  );
}
