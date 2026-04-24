import { Metadata } from 'next';
import { ServiceCards } from '@/components/public/sections';
import { getServices } from '@/lib/api/public';

export const metadata: Metadata = { title: 'Services', description: 'Engineering services provided by Divinerock.' };

export default async function ServicesPage() {
  const services = await getServices();
  return <section><h1 className="mb-5 text-3xl font-bold">Services</h1><ServiceCards items={services.items} /></section>;
}
