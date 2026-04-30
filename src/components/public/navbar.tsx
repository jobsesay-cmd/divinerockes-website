import Link from 'next/link';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/projects', 'Projects'],
  ['/equipment', 'Equipment'],
  ['/news', 'News'],
  ['/contact', 'Contact'],
  ['/quote', 'Quote'],
];

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4" aria-label="Main navigation">
        <Link href="/" className="text-lg font-extrabold text-brand-700">
          Divinerock ES
        </Link>
        <ul className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-700">
          {links.map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="transition hover:text-brand-700">
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/admin" className="rounded bg-brand-500 px-3 py-2 text-white hover:bg-brand-700">
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
