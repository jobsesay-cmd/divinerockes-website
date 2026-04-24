import type { Metadata } from 'next';
import ProjectsClientPage from './projects-client';

export const metadata: Metadata = {
  title: 'Our Projects',
  description: 'Project portfolio from Divinerock Engineering Services',
};

export default function ProjectsPage() {
  return <ProjectsClientPage />;
}
