import { Card } from '@/components/ui/card';
import { ContentForm } from '@/components/admin/content-form';
import { listProjects } from '@/domains/projects/service';
import { prisma } from '@/lib/prisma';
import ProjectsTableManager from '@/components/admin/projects-table-manager';

export default async function ProjectsAdminPage() {
  const [projects, categories] = await Promise.all([
    listProjects(1, 100),
    prisma.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="mb-4 text-2xl font-bold">Projects Manager</h1>
        <ContentForm endpoint="/api/projects" titleLabel="Project title" supportsCoverImage />
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-semibold">Existing Projects</h2>
        <ProjectsTableManager projects={projects as any} categories={categories} />
      </Card>
    </div>
  );
}