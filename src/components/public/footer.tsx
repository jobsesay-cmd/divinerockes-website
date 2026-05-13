import Link from 'next/link';
import styles from './footer.module.css';

export function PublicFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <h4>Divinerock Engineering Services</h4>
            <p>
              Delivering reliable civil engineering, construction, and fabrication
              solutions across Sierra Leone.
            </p>
          </div>

          <div className={styles.footerCol}>
            <h4>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/projects">Projects</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Services</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/services">Construction Services</Link></li>
              <li><Link href="/services">Civil Engineering</Link></li>
              <li><Link href="/services">Fabrication</Link></li>
              <li><Link href="/services">Project Management</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Contact</h4>
            <p>Freetown, Sierra Leone</p>
            <p>+232 00 000 000</p>
            <p>info@divinerockes.com</p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          © {new Date().getFullYear()} Divinerock Engineering Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
}