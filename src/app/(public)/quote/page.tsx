import { Metadata } from 'next';
import { QuoteForm } from '@/components/forms/quote-form';

export const metadata: Metadata = { title: 'Request Quote', description: 'Request an engineering quote from Divinerock.' };

export default function QuotePage() {
  return <section className="space-y-4"><h1 className="text-3xl font-bold">Request a Quote</h1><p className="text-slate-700">Share your project details and we will prepare a proposal.</p><QuoteForm /></section>;
}
