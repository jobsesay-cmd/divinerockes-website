import { Metadata } from 'next';
import { NewsList } from '@/components/public/sections';
import { getNews } from '@/lib/api/public';

export const metadata: Metadata = { title: 'News', description: 'News and updates from Divinerock Engineering Services.' };

export default async function NewsPage() {
  const news = await getNews();
  return <section><h1 className="mb-5 text-3xl font-bold">News</h1><NewsList items={news.items} /></section>;
}
