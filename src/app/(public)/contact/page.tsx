import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/contact-form';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact | Divinerock Engineering Services',
  description: 'Contact Divinerock Engineering Services for project inquiries, tenders, and partnerships.',
};

const infoCards = [
  { title: 'Office Address', value: 'Sierratel Earth Station, Main Motor Road, Wilberforce, Freetown, Sierra Leone' },
  { title: 'Phone Number', value: '+232 00 000 000 / +232 11 111 111' },
  { title: 'Email Address', value: 'info@divinerock.sl · projects@divinerock.sl · tenders@divinerock.sl' },
  { title: 'Office Hours', value: 'Monday–Friday: 8:00 AM – 5:00 PM | Saturday: 9:00 AM – 1:00 PM' },
] as const;

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <section className={styles.pageBanner}>
        <div className={styles.container}>
          <h1 className="text-4xl font-bold">Contact Divinerock Engineering Services</h1>
          <p className="mt-3 text-lg">Get in touch with our team to discuss your project requirements, tenders, and partnerships.</p>
        </div>
      </section>

      <section>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            {infoCards.map((card) => (
              <article key={card.title} className={styles.card}>
                <h2 className="text-xl font-semibold text-sky-700">{card.title}</h2>
                <p className={`${styles.muted} mt-2`}>{card.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className={styles.container}>
          <div className={styles.mainGrid}>
            <article className={styles.card}>
              <h2 className={styles.sectionTitle}>Send Us a Message</h2>
              <p className={styles.muted}>Complete the form and our team will respond within 24–48 hours.</p>
              <div className="mt-5">
                <ContactForm />
              </div>
            </article>

            <aside className={`${styles.card} ${styles.bgLight}`}>
              <h2 className={styles.sectionTitle}>Business & Tender Inquiries</h2>
              <p className={styles.muted}>For tenders, partnerships, or project consultations, contact our dedicated team channels.</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                <li>General: info@divinerock.sl</li>
                <li>Projects: projects@divinerock.sl</li>
                <li>Tenders: tenders@divinerock.sl</li>
                <li>Partnerships: partnerships@divinerock.sl</li>
                <li>Careers: careers@divinerock.sl</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
