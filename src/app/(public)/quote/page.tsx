import type { Metadata } from 'next';
import { QuoteForm } from '@/components/forms/quote-form';
import styles from './quote.module.css';

export const metadata: Metadata = {
  title: 'Request a Quote | Divinerock Engineering Services',
  description:
    'Share your project requirements and receive a tailored engineering and construction quote from Divinerock Engineering Services.',
};

const whyChooseUs = [
  'Professional engineering and project planning team',
  'Transparent pricing with clear scope definitions',
  'Practical timelines backed by field experience',
  'Quality-first execution and safety compliance',
] as const;

const requestSteps = [
  {
    title: 'Submit Project Details',
    description: 'Tell us about your project scope, preferred timeline, and service needs using the form below.',
  },
  {
    title: 'Technical Review',
    description: 'Our engineers review your requirements and identify technical, resource, and delivery considerations.',
  },
  {
    title: 'Receive Your Quote',
    description: 'We send a structured quote covering scope, estimated budget range, and expected delivery phases.',
  },
] as const;

export default function QuotePage() {
  return (
    <div className="space-y-12">
      <section className={styles.pageBanner}>
        <div className={styles.container}>
        <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium">Project Consultation</p>
        <h1 className={styles.sectionTitle}>Request a Quote</h1>
        <p className="mt-4 max-w-3xl text-slate-200">
          Planning a construction, infrastructure, fabrication, or civil engineering project? Share your requirements and our team will prepare a
          tailored proposal for your goals.
        </p>
              </div>
      </section>

      <section className={styles.layoutGrid}>
        <article className={styles.card}>
          <h2 className="text-2xl font-semibold text-slate-900">Tell us about your project</h2>
          <p className={styles.sectionSubtitle}>
            Complete the form with your project details. Accurate information helps us provide a faster, more reliable estimate.
          </p>
          <div className="mt-6">
            <QuoteForm />
          </div>
        </article>

        <aside className="space-y-6">
          <article className={`${styles.card} ${styles.bgLight}`}>
            <h3 className="text-xl font-semibold text-slate-900">Why clients choose Divinerock</h3>
            <ul className={styles.bulletList}>
              {whyChooseUs.map((item) => (
                <li key={item} className={styles.bulletItem}>
                  <span aria-hidden className={styles.dot} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={styles.card}>
            <h3 className="text-xl font-semibold text-slate-900">What happens next</h3>
            <ol className={styles.steps}>
              {requestSteps.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <p className="text-sm font-semibold text-blue-700">Step {index + 1}</p>
                  <p className="mt-1 font-medium text-slate-900">{step.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{step.description}</p>
                </li>
              ))}
            </ol>
          </article>
        </aside>
      </section>
    </div>
  );
}
