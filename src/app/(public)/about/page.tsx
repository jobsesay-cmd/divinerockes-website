import type { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullseye,
  faEye,
  faStar,
  faHandshake,
  faShieldHalved,
  faUserTie,
  faLightbulb,
  faUsers,
  faCircleCheck,
  faCertificate,
  faHelmetSafety,
  faLeaf,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Divinerock Engineering Services',
};

const coreValues = [
  [faStar, 'Quality', 'We deliver infrastructure work with engineering rigor and long-term value.'],
  [faHandshake, 'Integrity', 'We operate with transparency, accountability, and ethical conduct.'],
  [faShieldHalved, 'Safety', 'Safety is integrated into every project phase and site operation.'],
  [faUserTie, 'Professionalism', 'Our teams execute with discipline, competence, and consistency.'],
  [faLightbulb, 'Innovation', 'We adopt modern tools and methods to improve project outcomes.'],
  [faUsers, 'Teamwork', 'Cross-functional collaboration is at the core of our delivery model.'],
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
              Divinerock Engineering Services is a professional civil engineering and construction company delivering high-quality infrastructure and engineering solutions for public and private sector clients.
            </p>
            <p>
              We combine experienced engineers, technicians, and construction specialists to execute projects that align with modern engineering standards and local operational needs.
            </p>
            <p>
              Our scope spans road construction, bridge works, building development, structural fabrication, and project management.
            </p>
            <div className={styles.highlight}>
              <h3>Our Commitment</h3>
              <p>
                We are committed to excellence in every project, exceeding expectations and supporting sustainable infrastructure growth across Sierra Leone.
              </p>
            </div>
          </div>
          <div className={styles.imageWrap}>
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80" alt="Divinerock Engineering Team" />
          </div>
        </div>
      </section>

      <section className={styles.light}>
        <div className={styles.twoCol}>
          <article className={styles.card}>
            <span className={styles.icon}><FontAwesomeIcon icon={faBullseye} /></span>
            <h3>Our Mission</h3>
            <p>To provide reliable, high-quality engineering and construction services with excellence in safety, professionalism, and environmental responsibility.</p>
          </article>
          <article className={styles.card}>
            <span className={`${styles.icon} ${styles.accent}`}><FontAwesomeIcon icon={faEye} /></span>
            <h3>Our Vision</h3>
            <p>To be a trusted civil engineering and construction leader known for innovative, sustainable infrastructure solutions.</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.center}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <p className={styles.subtitle}>The principles that define our work culture and delivery standards.</p>
        </div>
        <div className={styles.valuesGrid}>
          {coreValues.map(([icon, title, copy]) => (
            <article key={title} className={styles.card}>
              <span className={styles.icon}><FontAwesomeIcon icon={icon} /></span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.capability}>
        <h2 className={styles.sectionTitle}>Our Capability Statement</h2>
        <p>
          We provide professional civil engineering, construction, and fabrication services, with delivery capacity across road infrastructure, bridges, buildings, steel fabrication, and project management.
        </p>
        <div className={styles.stats}>
          <div className={styles.stat}><strong>25+</strong><span>Projects Completed</span></div>
          <div className={styles.stat}><strong>15+</strong><span>Skilled Engineers</span></div>
          <div className={styles.stat}><strong>10+</strong><span>Years Experience</span></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.safetyGrid}>
          <div>
            <h3 className={styles.sectionTitle}>Health & Safety Commitment</h3>
            <ul className={styles.list}>
              {[
                'Strict safety procedures and protocols on all sites',
                'Regular safety training and toolbox talks for all staff',
                'Mandatory personal protective equipment (PPE) usage',
                'Regular site inspections and safety audits',
                'Incident reporting and investigation procedures',
                'Emergency response plans for project locations',
              ].map((item) => (
                <li key={item}><FontAwesomeIcon icon={faCircleCheck} color="#d83936" /> {item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.imageWrap}>
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80" alt="Safety on site" />
          </div>
        </div>
      </section>

      <section className={styles.light}>
        <div className={styles.center}>
          <h2 className={styles.sectionTitle}>Certifications & Compliance</h2>
          <p className={styles.subtitle}>We operate in accordance with industry standards and regulatory requirements.</p>
        </div>
        <div className={styles.certGrid}>
          {[
            [faCertificate, 'ISO 9001:2015', 'Quality Management Systems'],
            [faHelmetSafety, 'ISO 45001', 'Occupational Health & Safety'],
            [faLeaf, 'ISO 14001', 'Environmental Management'],
            [faBuilding, 'NCCE Registered', 'National Council of Civil Engineers'],
          ].map(([icon, title, copy]) => (
            <article key={title as string} className={styles.card}>
              <span className={styles.icon}><FontAwesomeIcon icon={icon as typeof faCertificate} /></span>
              <h4>{title as string}</h4>
              <p>{copy as string}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to Start Your Project?</h2>
        <p>Partner with Divinerock Engineering Services for reliable, professional, and quality engineering solutions.</p>
        <Link href="/quote" className={styles.ctaButton}>Request a Quote</Link>
      </section>
    </div>
  );
}
