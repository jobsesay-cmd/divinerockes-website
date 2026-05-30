import Link from 'next/link';
import { listProjectCategories, listProjectsPublic } from '@/domains/projects/service';
import styles from './projects.module.css';

type SearchParams = Promise<{ page?: string; category?: string }>;

function fallbackImageForProject(categorySlug?: string) {
  if (categorySlug?.includes('bridge')) return '/images/bridge.jpg';
  if (categorySlug?.includes('road')) return '/images/project-road.jpg';
  return '/images/about-construction.jpg';
}

export default async function ProjectsPage({ searchParams }: { searchParams: SearchParams }) {
  const { page, category } = await searchParams;
  const pageNum = Math.max(1, Number(page ?? '1'));
  const pageSize = 9;

  const [categories, result] = await Promise.all([
    listProjectCategories(),
    listProjectsPublic(pageNum, pageSize, category || undefined),
  ]);

  const totalPages = Math.max(1, Math.ceil(result.total / pageSize));

  return (
    <main className={styles.page}>
      <section className={styles.pageBanner}>
        <div className={styles.container}>
          <h1>Our Projects</h1>
          <p>Explore published engineering and construction projects from Divinerock Engineering Services.</p>
        </div>
      </section>

      <section className={`${styles.bgLight} ${styles.filterSection}`}>
        <div className={styles.container}>
          <div className={styles.projectFilters}>
            <Link href="/projects" className={`${styles.filterBtn} ${!category ? styles.active : ''}`}>All Projects</Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/projects?category=${encodeURIComponent(c.slug)}`}
                className={`${styles.filterBtn} ${category === c.slug ? styles.active : ''}`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bgLight}>
        <div className={styles.container}>
          <div className={styles.projectsGrid}>
            {result.items.map((project) => {
              const firstCategory = project.projectCategories[0]?.category;
              const cardImage = project.seo?.ogImageUrl ?? fallbackImageForProject(firstCategory?.slug);
              return (
                <article key={project.id} className={styles.projectCard}>
                  <div className={styles.projectImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cardImage} alt={project.title} />
                    <span className={styles.projectCategory}>{firstCategory?.name ?? 'Uncategorized'}</span>
                  </div>

                  <div className={styles.projectContent}>
                    <h3>{project.title}</h3>
                    {project.location ? <p className={styles.projectDescription}>{project.location}</p> : null}
                    {project.summary ? <p className={styles.projectDescription}>{project.summary}</p> : null}

                    <div className="mt-3">
                      <Link href={`/projects/${project.slug}`} className={styles.filterBtn}>
                        View details
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {result.items.length === 0 ? <p className="text-sm text-slate-500">No projects found for this filter.</p> : null}

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href={`/projects?page=${Math.max(1, pageNum - 1)}${category ? `&category=${encodeURIComponent(category)}` : ''}`}
              className={styles.filterBtn}
              aria-disabled={pageNum <= 1}
            >
              Previous
            </Link>
            <span className="text-sm text-slate-600">Page {pageNum} of {totalPages}</span>
            <Link
              href={`/projects?page=${Math.min(totalPages, pageNum + 1)}${category ? `&category=${encodeURIComponent(category)}` : ''}`}
              className={styles.filterBtn}
              aria-disabled={pageNum >= totalPages}
            >
              Next
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}