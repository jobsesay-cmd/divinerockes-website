import { Card } from '@/components/ui/card';
import { ContentForm } from '@/components/admin/content-form';

export default function ServicesAdminPage() {
  return <Card><h1 className="mb-4 text-2xl font-bold">Services Manager</h1><ContentForm endpoint="/api/services" titleLabel="Service name" /></Card>;
}
