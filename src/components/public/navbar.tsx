import Link from 'next/link';

const links = [
  ['/', 'Home'],
  ['/about', 'About Us'],
  ['/services', 'Services'],
  ['/projects', 'Projects'],
  ['/equipment', 'Equipment'],
  ['/news', 'News'],
  ['/contact', 'Contact'],
];

export function PublicNavbar() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>DIVINEROCK</h1>
          <span>Engineering Services</span>
        </div>

        <nav className="nav-menu" aria-label="Main navigation">
          {links.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          <Link href="/quote" className="quote-btn">
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}