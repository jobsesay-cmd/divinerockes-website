import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from './news.module.css';

export const metadata: Metadata = {
  title: 'News | Divinerock Engineering Services',
  description:
    'Project updates, company announcements, industry insights, and events from Divinerock Engineering Services.',
};

type CategoryKey = 'all' | 'projects' | 'announcements' | 'industry' | 'events';
type NewsCategory = 'PROJECT_UPDATE' | 'ANNOUNCEMENT' | 'INSIGHT' | 'EVENT';

type UiArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: unknown;
  coverImageUrl: string | null;
  publishedAt: Date | null;
  bucket: Exclude<CategoryKey, 'all'>;
  isFeatured: boolean;
};

const categoryDefinitions: Array<{ key: CategoryKey; label: string }> = [
  { key: 'all', label: 'All News' },
  { key: 'projects', label: 'Project Updates' },
  { key: 'announcements', label: 'Company Announcements' },
  { key: 'industry', label: 'Industry Insights' },
  { key: 'events', label: 'Events' },
];

function bodyToText(body: unknown): string {
  if (typeof body === 'string') return body;
  if (body == null) return '';
  try {
    return JSON.stringify(body);
  } catch {
    return '';
  }
}

function extractMeta(body: unknown): { category?: NewsCategory; isFeatured?: boolean } {
  if (body && typeof body === 'object' && !Array.isArray(body)) {
    const b = body as any;
    const meta = b.meta;
    if (meta && typeof meta === 'object') {
      return {
        category: meta.category,
        isFeatured: Boolean(meta.isFeatured),
      };
    }
  }
  return {};
}

function inferBucket(article: { title: string; excerpt: string | null; body: unknown }): UiArticle['bucket'] {
  const meta = extractMeta(article.body);
  if (meta.category === 'PROJECT_UPDATE') return 'projects';
  if (meta.category === 'ANNOUNCEMENT') return 'announcements';
  if (meta.category === 'INSIGHT') return 'industry';
  if (meta.category === 'EVENT') return 'events';

  const text = `${article.title} ${article.excerpt ?? ''} ${bodyToText(article.body)}`.toLowerCase();
  if (/event|summit|workshop|conference|launch/.test(text)) return 'events';
  if (/project|site|construction|bridge|road|handover/.test(text)) return 'projects';
  if (/announce|statement|notice|company|press/.test(text)) return 'announcements';
  return 'industry';
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function toExcerpt(article: { excerpt: string | null; body: unknown }): string {
  if (article.excerpt?.trim()) return article.excerpt.trim();
  return stripHtml(bodyToText(article.body)).slice(0, 180);
}

function formatDate(date: Date | null): string {
  if (!date) return 'Draft';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

async function getNews(): Promise<UiArticle[]> {
  const rows = await prisma.newsArticle.findMany({
    where: { deletedAt: null, status: 'PUBLISHED' },
    orderBy: [{ publishedAt: 'desc' }, { updatedAt: 'desc' }],
    take: 24,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      body: true,
      coverImageUrl: true,
      publishedAt: true,
    },
  });

  return rows.map((row) => {
    const meta = extractMeta(row.body);
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: toExcerpt(row),
      body: row.body,
      coverImageUrl: row.coverImageUrl,
      publishedAt: row.publishedAt,
      bucket: inferBucket(row),
      isFeatured: Boolean(meta.isFeatured),
    };
  });
}

export default async function NewsPage() {
  const news = await getNews();
  const explicitFeatured = news.find((n) => n.isFeatured);
  const featured = explicitFeatured ?? news[0] ?? null;
  const remaining = featured ? news.filter((n) => n.id !== featured.id) : news;
  const recent = remaining.slice(0, 6);

  const grouped = {
    projects: news.filter((n) => n.bucket === 'projects').slice(0, 3),
    announcements: news.filter((n) => n.bucket === 'announcements').slice(0, 3),
    industry: news.filter((n) => n.bucket === 'industry').slice(0, 3),
    events: news.filter((n) => n.bucket === 'events').slice(0, 3),
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>News & Insights</h1>
        <p>Stay updated with project progress, company updates, industry perspectives, and events.</p>
        <div className={styles.chips}>
          {categoryDefinitions.map((c) => (
            <a key={c.key} href={`#${c.key}`} className={styles.chip}>
              {c.label}
            </a>
          ))}
        </div>
      </section>

      {featured ? (
        <section className={styles.featured} id="all">
          <h2>Featured Story</h2>
          <article className={styles.featuredCard}>
            {featured.coverImageUrl ? <img src={featured.coverImageUrl} alt={featured.title} /> : null}
            <div>
              <p className={styles.meta}>{formatDate(featured.publishedAt)}</p>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <Link href={`/news/${featured.slug}`}>Read full story</Link>
            </div>
          </article>
        </section>
      ) : null}

      <section className={styles.section}>
        <h2>Recent News</h2>
        <div className={styles.grid}>
          {recent.map((item) => (
            <article className={styles.card} key={item.id}>
              {item.coverImageUrl ? (
                <img className={styles.cardImage} src={item.coverImageUrl} alt={item.title} />
              ) : null}
              <div className={styles.cardContent}>
                <p className={styles.meta}>{formatDate(item.publishedAt)}</p>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <Link href={`/news/${item.slug}`}>Read more</Link>
              </div>
            </article>
          ))}
          {recent.length === 0 ? <p>No published news yet.</p> : null}
        </div>
      </section>

      <section className={styles.section} id="projects">
        <h2>Ongoing Project Updates</h2>
        <NewsMiniGrid items={grouped.projects} />
      </section>

      <section className={styles.section} id="announcements">
        <h2>Company Announcements</h2>
        <NewsMiniGrid items={grouped.announcements} />
      </section>

      <section className={styles.section} id="industry">
        <h2>Industry Insights</h2>
        <NewsMiniGrid items={grouped.industry} />
      </section>

      <section className={styles.section} id="events">
        <h2>Events</h2>
        <NewsMiniGrid items={grouped.events} />
      </section>

      <section className={styles.newsletter}>
        <h2>Newsletter Subscription</h2>
        <p>Receive periodic updates from Divinerock directly in your inbox.</p>
        <form className={styles.form}>
          <input type="email" placeholder="Enter your email" aria-label="Email address" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </main>
  );
}

function NewsMiniGrid({ items }: { items: UiArticle[] }) {
  if (!items.length) return <p>No items available yet.</p>;
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <article className={styles.card} key={item.id}>
          {item.coverImageUrl ? <img className={styles.cardImage} src={item.coverImageUrl} alt={item.title} /> : null}
          <div className={styles.cardContent}>
            <p className={styles.meta}>{formatDate(item.publishedAt)}</p>
            <h3>{item.title}</h3>
            <p>{item.excerpt}</p>
            <Link href={`/news/${item.slug}`}>Read more</Link>
          </div>
        </article>
      ))}
    </div>
  );
}