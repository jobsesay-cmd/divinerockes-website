import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireAdminPermission } from '@/lib/auth/guards';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: Props) {
  await requireAdminPermission('projects:manage');
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) notFound();

  async function deleteProject() {
    'use server';
    await prisma.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    redirect('/admin/projects');
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Edit / Delete Project</h1>
      <p className="text-sm text-slate-600">Project: {project.title}</p>

      {/* Keep simple now: delete action; full edit form can be added next */}
      <form action={deleteProject}>
        <button
          type="submit"
          className="rounded bg-rose-600 px-4 py-2 text-white"
        >
          Delete Project
        </button>
      </form>
    </section>
  );
}