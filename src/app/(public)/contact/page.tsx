import { Metadata } from 'next';
import { ContactForm } from '@/components/forms/contact-form';

export const metadata: Metadata = { title: 'Contact', description: 'Contact Divinerock Engineering Services.' };

export default function ContactPage() {
  return <section className="max-w-2xl space-y-4"><h1 className="text-3xl font-bold">Contact Us</h1><p className="text-slate-700">Speak with our engineering team about your next project.</p><ContactForm /></section>;
}
