'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '@/components/admin/data-table';

const data = [
  { fullName: 'Aisha Bello', email: 'aisha@petrobuild.com', type: 'Quote', status: 'New' },
  { fullName: 'Mark Lewis', email: 'mark@northgrid.io', type: 'Contact', status: 'In Progress' },
];

const helper = createColumnHelper<(typeof data)[number]>();
const columns = [
  helper.accessor('fullName', { header: 'Name' }),
  helper.accessor('email', { header: 'Email' }),
  helper.accessor('type', { header: 'Type' }),
  helper.accessor('status', { header: 'Status' }),
];

export default function InquiriesPage() {
  return <section className="space-y-4"><h1 className="text-2xl font-bold">Inquiry Manager</h1><DataTable columns={columns} data={data} /></section>;
}
