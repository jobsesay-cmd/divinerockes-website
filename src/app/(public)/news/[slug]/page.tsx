import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await prisma.newsArticle.findFirst({
    where: { slug, deletedAt: null, status: 'PUBLISHED' },
    select: { title: true, excerpt: true, coverImageUrl: true },
  });

  if (!item) {
    return { title: 'News | Divinerock Engineering Services' };
  }

  return {
    title: `${item.title} | News | Divinerock`,
    description: item.excerpt ?? undefined,
    openGraph: {
      title: item.title,
      description: item.excerpt ?? undefined,
      images: item.coverImageUrl ? [item.coverImageUrl] : undefined,
    },
  };
}

function extractHtml(body: unknown): string {
  if (typeof body === 'string') return body;
  if (body && typeof body === 'object' && !Array.isArray(body)) {
    const b = body as any;
    if (typeof b.html === 'string') return b.html;
  }
  return '';
}

export default async function NewsDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const item = await prisma.newsArticle.findFirst({
    where: { slug, deletedAt: null, status: 'PUBLISHED' },
    select: {
      title: true,
      body: true,
      coverImageUrl: true,
    },
  });

  if (!item) notFound();

  const html = extractHtml(item.body);

  return (
    <main className={styles.page}>
      <p className={styles.back}>
        <Link href="/news">← Back to News</Link>
      </p>

      <h1 className={styles.title}>{item.title}</h1>

      {item.coverImageUrl ? (
        <img
          src={item.coverImageUrl}
          alt={item.title}
          className={styles.cover}
        />
      ) : null}

      <article
        className={styles.article}
        dangerouslySetInnerHTML={{ __html: html || '<p>No content available.</p>' }}
      />
    </main>
  );
}