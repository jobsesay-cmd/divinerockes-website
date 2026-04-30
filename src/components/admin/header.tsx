import { getSessionUser } from '@/lib/auth/session';

export async function AdminHeader() {
  const session = await getSessionUser();
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-xl font-bold">Control Center</h1>
        <p className="text-sm text-slate-500">Welcome back, {session?.user.fullName ?? 'Admin'}.</p>
      </div>
    </header>
  );
}
