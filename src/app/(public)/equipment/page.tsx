import { Metadata } from 'next';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = { title: 'Equipment', description: 'Available engineering and construction equipment.' };

const equipment = ['Mobile crane fleet', 'NDT inspection kits', 'Hydraulic testing units', 'Safety and survey instruments'];

export default function EquipmentPage() {
  return (
    <section>
      <h1 className="mb-5 text-3xl font-bold">Equipment</h1>
      <div className="grid gap-5 md:grid-cols-2">{equipment.map((item) => <Card key={item}><h2 className="font-semibold">{item}</h2></Card>)}</div>
    </section>
  );
}
