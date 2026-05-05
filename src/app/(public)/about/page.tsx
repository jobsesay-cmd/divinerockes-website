import type { Metadata } from 'next';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About | Divinerock Engineering Services',
  description:
    'Learn about Divinerock Engineering Services, our mission, capabilities, and commitment to quality infrastructure delivery.',
};

const coreValues = [
  'Integrity in project delivery and stakeholder engagement',
  'Quality-first engineering and construction standards',
  'Safety and compliance across all operations',
  'Innovation and practical problem-solving on site',
] as const;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.banner}>
        <h1>About Divinerock Engineering Services</h1>
        <p>Building strong foundations for sustainable infrastructure through expertise, integrity, and innovation.</p>
      </section>

      <section className={styles.section}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <h2 className={styles.sectionTitle}>Company Overview</h2>
            <p>
              Divinerock Engineering Services is a professional civil engineering and construction company delivering high-quality infrastructure
              and engineering solutions for public and private sector clients.
            </p>
            <p>
              We combine experienced engineers, technicians, and construction specialists to execute projects that align with modern engineering
              standards and local operational needs.
            </p>
            <p>
              Our scope spans road construction, bridge works, building development, structural fabrication, electrical and solar installations,
              fumigation support services, and project management.
            </p>

            <div className={styles.highlight}>
              <h3>Our Commitment</h3>
              <p>
                We are committed to excellence in every project, exceeding expectations and supporting sustainable infrastructure growth across
                Sierra Leone.
              </p>
            </div>
          </div>

          <div className={styles.imageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80"
              alt="Divinerock Engineering Team"
            />
          </div>
        </div>
      </section>

      <section className={styles.light}>
        <div className={styles.twoCol}>
          <article className={styles.card}>
            <h2>Our Mission</h2>
            <p>
              To deliver dependable engineering and construction solutions that improve communities, enable growth, and create lasting
              infrastructure value.
            </p>
          </article>
          <article className={styles.card}>
            <h2>Our Vision</h2>
            <p>
              To be a trusted leader in civil engineering and construction across Sierra Leone and beyond through quality, safety, and innovation.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Values</h2>
        <ul className={styles.valuesList}>
          {coreValues.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}