import { PublicFooter } from '@/components/public/footer';
import { PublicNavbar } from '@/components/public/navbar';

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PublicNavbar />
      <main className="mx-auto min-h-screen max-w-7xl space-y-16 px-4 py-10">{children}</main>
      <PublicFooter />
    </>
  );
}
