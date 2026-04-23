import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { NewsItem, ProjectItem, ServiceItem } from '@/lib/api/public';

export function ServiceCards({ items }: { items: ServiceItem[] }) {
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{items.map((item) => <Card key={item.id}><h3 className="text-lg font-semibold">{item.name}</h3><p className="mt-2 text-sm text-slate-600">{item.summary ?? 'Specialized engineering solutions tailored to your operations.'}</p></Card>)}</div>;
}

export function ProjectList({ items }: { items: ProjectItem[] }) {
  return <div className="grid gap-6 md:grid-cols-2">{items.map((item) => <Card key={item.id}><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm text-slate-600">{item.summary ?? 'Project delivery details available on request.'}</p><p className="mt-2 text-xs uppercase tracking-wide text-brand-700">{item.location ?? 'Global'}</p></Card>)}</div>;
}

export function NewsList({ items }: { items: NewsItem[] }) {
  return <div className="grid gap-6 lg:grid-cols-3">{items.map((item) => <Card key={item.id} className="overflow-hidden p-0">{item.coverImageUrl && <div className="relative h-48 w-full"><Image src={item.coverImageUrl} alt={item.title} fill className="object-cover" /></div>}<div className="p-5"><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm text-slate-600">{item.excerpt ?? 'Read latest updates from Divinerock Engineering Services.'}</p></div></Card>)}</div>;
}
