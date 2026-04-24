import { apiGet } from '@/lib/api/client';
import type { PaginatedResult } from '@/types/api';

export type ServiceItem = { id: string; name: string; slug: string; summary?: string | null; content: string };
export type ProjectItem = { id: string; title: string; slug: string; summary?: string | null; location?: string | null; featured?: boolean };
export type NewsItem = { id: string; title: string; slug: string; excerpt?: string | null; coverImageUrl?: string | null; publishedAt?: string | null };
export type PageItem = { id: string; title: string; slug: string; content: string };

export async function getServices() {
  return apiGet<PaginatedResult<ServiceItem>>('/api/services?page=1&pageSize=12');
}

export async function getProjects() {
  return apiGet<PaginatedResult<ProjectItem>>('/api/projects?page=1&pageSize=20');
}

export async function getNews() {
  return apiGet<PaginatedResult<NewsItem>>('/api/news?page=1&pageSize=20');
}

export async function getPages() {
  return apiGet<PaginatedResult<PageItem>>('/api/pages?page=1&pageSize=20');
}
