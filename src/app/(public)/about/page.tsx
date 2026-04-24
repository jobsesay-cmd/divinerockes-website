import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Divinerock Engineering Services.',
};

export default function AboutPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">About Divinerock Engineering Services</h1>
      <p className="text-slate-700">Divinerock Engineering Services is a multidisciplinary engineering company focused on project execution, safety, and operational reliability.</p>
      <p className="text-slate-700">Our teams combine field experience with modern digital workflows to deliver projects from concept design through commissioning.</p>
    </section>
  );
}
