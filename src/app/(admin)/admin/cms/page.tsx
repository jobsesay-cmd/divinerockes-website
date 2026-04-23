import { Card } from '@/components/ui/card';
import { ContentForm } from '@/components/admin/content-form';

export default function CmsPage() {
  return <Card><h1 className="mb-4 text-2xl font-bold">CMS Pages</h1><ContentForm endpoint="/api/pages" /></Card>;
}
