import { Card } from '@/components/ui/card';
import { ContentForm } from '@/components/admin/content-form';

export default function NewsAdminPage() {
  return <Card><h1 className="mb-4 text-2xl font-bold">News Manager</h1><ContentForm endpoint="/api/news" titleLabel="Article title" supportsCoverImage /></Card>;
}
