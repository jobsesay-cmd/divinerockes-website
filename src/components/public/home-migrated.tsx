import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBolt, faHelmetSafety, faIndustry, faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import { Card } from '@/components/ui/card';
import type { NewsItem, ProjectItem, ServiceItem } from '@/lib/api/public';

const heroImage =
  'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg';

export function MigratedHomePage({
  services,
  projects,
  news,
}: {
  services: ServiceItem[];
  projects: ProjectItem[];
  news: NewsItem[];
}) {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 rounded-2xl bg-slate-900 p-8 text-white lg:grid-cols-2 lg:p-12">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-slate-600 px-4 py-1 text-xs tracking-[0.2em] text-slate-200">
            DIVINEROCK ENGINEERING SERVICES
          </p>
          <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
            Engineering, Procurement & Construction for Energy and Industrial Infrastructure.
          </h1>
          <p className="max-w-xl text-slate-300">
            We execute multidisciplinary projects with strong delivery governance, certified safety practices, and transparent reporting.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-md bg-brand-500 px-5 py-3 text-sm font-semibold hover:bg-brand-700">
              Request a Quote <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </Link>
            <Link href="/projects" className="inline-flex items-center rounded-md border border-slate-500 px-5 py-3 text-sm font-semibold hover:bg-slate-800">
              View Projects
            </Link>
          </div>
        </div>
        <div className="relative min-h-72 overflow-hidden rounded-xl border border-slate-700">
          <Image src={heroImage} alt="Divinerock engineering operations" fill className="object-cover opacity-80" priority />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          [faIndustry, 'Plant Engineering', 'Concept and FEED to detailed design for process plants.'],
          [faBolt, 'Power Systems', 'Substation and electrical balance-of-plant engineering delivery.'],
          [faRulerCombined, 'Civil Works', 'Infrastructure, foundations, steel and concrete structures.'],
          [faHelmetSafety, 'HSE Delivery', 'Safety-first execution standards across all work packages.'],
        ].map(([icon, title, copy]) => (
          <Card key={title as string}>
            <FontAwesomeIcon icon={icon as typeof faIndustry} className="mb-4 h-5 w-5 text-brand-700" />
            <h2 className="text-lg font-semibold">{title as string}</h2>
            <p className="mt-2 text-sm text-slate-600">{copy as string}</p>
          </Card>
        ))}
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Services</h2>
          <Link href="/services" className="text-sm font-semibold text-brand-700">
            See all services
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((item) => (
            <Card key={item.id}>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.summary ?? 'End-to-end technical service delivery for industrial operations.'}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-bold">Featured Projects</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.slice(0, 3).map((item) => (
            <Card key={item.id}>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{item.location ?? 'Multi-region'}</p>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.summary ?? 'Detailed project profile available on request.'}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map((item) => (
            <Card key={item.id}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.excerpt ?? 'Read the latest company and project updates from our newsroom.'}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
