'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '@/components/ui/card';

const monthly = [
  { month: 'Jan', inquiries: 22 },
  { month: 'Feb', inquiries: 29 },
  { month: 'Mar', inquiries: 35 },
  { month: 'Apr', inquiries: 31 },
  { month: 'May', inquiries: 44 },
  { month: 'Jun', inquiries: 40 },
];

export function DashboardWidgets() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Open Projects', '18'],
          ['Active Services', '12'],
          ['Unread Inquiries', '26'],
          ['Published News', '47'],
        ].map(([label, value]) => (
          <Card key={label}>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </Card>
        ))}
      </div>
      <Card>
        <h2 className="mb-4 text-lg font-semibold">Inquiry Trends</h2>
        <div className="h-80">
          <ResponsiveContainer>
            <BarChart data={monthly}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="inquiries" fill="#0a5eb8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          <li>New quote inquiry received from PetroBuild LLC.</li>
          <li>Homepage content updated by Content Manager.</li>
          <li>SEO metadata changed for Projects page.</li>
        </ul>
      </Card>
    </div>
  );
}
