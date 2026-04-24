'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiPost } from '@/lib/api/client';
import { quoteFormSchema } from '@/lib/validation/forms';
import type { z } from 'zod';

type QuoteValues = z.infer<typeof quoteFormSchema>;

export function QuoteForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<QuoteValues>({ resolver: zodResolver(quoteFormSchema) });

  const onSubmit = async (values: QuoteValues) => {
    await apiPost('/api/inquiries/quotes', {
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      company: values.company,
      serviceType: values.projectType,
      timeline: values.timeline,
      requirements: values.message,
    });
    toast.success('Quote request submitted');
  };

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit, () => toast.error('Please fix errors'))} noValidate>
      <Input placeholder="Full name" {...register('fullName')} aria-label="Full name" />
      <Input placeholder="Email" type="email" {...register('email')} aria-label="Email" />
      <Input placeholder="Phone" {...register('phone')} aria-label="Phone" />
      <Input placeholder="Company" {...register('company')} aria-label="Company" />
      <Input placeholder="Project type" {...register('projectType')} aria-label="Project type" />
      <Input placeholder="Budget range" {...register('budgetRange')} aria-label="Budget range" />
      <Input placeholder="Timeline" {...register('timeline')} aria-label="Timeline" />
      <Textarea className="md:col-span-2" placeholder="Project scope" rows={5} {...register('message')} aria-label="Project scope" />
      {Object.values(errors)[0] && <p className="md:col-span-2 text-sm text-rose-600">Please review required fields.</p>}
      <div className="md:col-span-2"><Button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Request Quote'}</Button></div>
    </form>
  );
}
