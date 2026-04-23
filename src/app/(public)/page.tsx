import { HeroSection } from '@/components/public/hero';
import { NewsList, ProjectList, ServiceCards } from '@/components/public/sections';
import { getNews, getProjects, getServices } from '@/lib/api/public';

export default async function HomePage() {
  const [services, projects, news] = await Promise.all([getServices(), getProjects(), getNews()]);

  return (
    <>
      <HeroSection />
      <section>
        <h2 className="mb-5 text-2xl font-bold">Core Services</h2>
        <ServiceCards items={services.items.slice(0, 6)} />
      </section>
      <section>
        <h2 className="mb-5 text-2xl font-bold">Featured Projects</h2>
        <ProjectList items={projects.items.slice(0, 4)} />
      </section>
      <section>
        <h2 className="mb-5 text-2xl font-bold">Latest News</h2>
        <NewsList items={news.items.slice(0, 3)} />
      </section>
    </>
  );
}
