import Link from 'next/link';
import styles from './navbar.module.css';

const links = [
  ['/', 'Home'],
  ['/about', 'About Us'],
  ['/services', 'Services'],
  ['/projects', 'Projects'],
  ['/equipment', 'Equipment'],
  ['/news', 'News'],
  ['/contact', 'Contact'],
] as const;

export function PublicNavbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="Divine Rock Engineering Services home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Divine Rock Engineering Services Limited logo" />
        </Link>

        <nav className={styles.navMenu} aria-label="Main navigation">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className={styles.navLink}>
              {label}
            </Link>
          ))}
          <Link href="/quote" className={styles.quoteBtn}>
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}