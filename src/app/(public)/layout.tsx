import { PublicFooter } from '@/components/public/footer';
import { PublicNavbar } from '@/components/public/navbar';

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PublicNavbar />
      <main>{children}</main>
      <PublicFooter />
    </>
  );
}