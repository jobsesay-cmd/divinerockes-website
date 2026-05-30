import { notFound } from 'next/navigation';
import { getProjectGalleryImages, getProjectPublicBySlug } from '@/domains/projects/service';

function fallbackImageForProject(categorySlug?: string) {
  if (categorySlug?.includes('bridge')) return '/images/bridge.jpg';
  if (categorySlug?.includes('road')) return '/images/project-road.jpg';
  return '/images/about-construction.jpg';
}

function descriptionHtml(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function projectImages(coverImage: string, galleryImageUrls: string[]) {
  return Array.from(new Set([coverImage, ...galleryImageUrls].filter(Boolean)));
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectPublicBySlug(slug);
  if (!project) notFound();

  const category = project.projectCategories[0]?.category;
  const coverImage = project.seo?.ogImageUrl ?? fallbackImageForProject(category?.slug);
  const images = projectImages(coverImage, getProjectGalleryImages(project));

  return (
    <main className="bg-slate-50 pb-12">
      <section className="relative min-h-[360px] overflow-hidden bg-slate-900 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverImage} alt={project.title} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="relative mx-auto flex min-h-[360px] max-w-5xl flex-col justify-end px-4 py-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">{category?.name ?? 'Uncategorized'}</p>
          <h1 className="mt-2 text-4xl font-bold">{project.title}</h1>
          {project.location ? <p className="mt-3 text-lg text-slate-100">{project.location}</p> : null}
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-8 px-4 py-10">
        <article className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">Project description</h2>
          <div
            className="prose-content text-slate-700"
            dangerouslySetInnerHTML={{ __html: descriptionHtml(project.description) }}
          />
        </article>

        {images.length > 0 ? (
          <section className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">Project gallery</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {images.map((image) => (
                <div key={image} className="overflow-hidden rounded-lg border bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={`${project.title} gallery image`} className="h-56 w-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}