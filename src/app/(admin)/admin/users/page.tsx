'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '@/components/admin/data-table';

const users = [
  { name: 'Admin User', role: 'Administrator', email: 'admin@divinerockes.com' },
  { name: 'Content Manager', role: 'Editor', email: 'editor@divinerockes.com' },
];

const helper = createColumnHelper<(typeof users)[number]>();
const columns = [
  helper.accessor('name', { header: 'Name' }),
  helper.accessor('email', { header: 'Email' }),
  helper.accessor('role', { header: 'Role' }),
];

export default function UsersPage() {
  return <section className="space-y-4"><h1 className="text-2xl font-bold">User Management</h1><DataTable columns={columns} data={users} /></section>;
}
