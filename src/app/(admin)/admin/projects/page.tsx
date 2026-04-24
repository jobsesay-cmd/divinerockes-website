import { Card } from '@/components/ui/card';
import { ContentForm } from '@/components/admin/content-form';

export default function ProjectsAdminPage() {
  return <Card><h1 className="mb-4 text-2xl font-bold">Projects Manager</h1><ContentForm endpoint="/api/projects" titleLabel="Project title" /></Card>;
}
