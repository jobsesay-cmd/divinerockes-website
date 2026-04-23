import { Metadata } from 'next';
import { ProjectList } from '@/components/public/sections';
import { getProjects } from '@/lib/api/public';

export const metadata: Metadata = { title: 'Projects', description: 'Project portfolio from Divinerock Engineering Services.' };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <section><h1 className="mb-5 text-3xl font-bold">Projects</h1><ProjectList items={projects.items} /></section>;
}
