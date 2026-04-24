import { MigratedHomePage } from '@/components/public/home-migrated';
import { getNews, getProjects, getServices } from '@/lib/api/public';

export default async function HomePage() {
  const [services, projects, news] = await Promise.all([getServices(), getProjects(), getNews()]);

  return <MigratedHomePage services={services.items} projects={projects.items} news={news.items} />;
}
