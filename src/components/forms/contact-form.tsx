'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiPost } from '@/lib/api/client';
import { contactFormSchema } from '@/lib/validation/forms';
import type { z } from 'zod';

type ContactValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (values: ContactValues) => {
    await apiPost('/api/inquiries', {
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      subject: values.company || 'Website contact inquiry',
      message: values.message,
      sourcePage: '/contact',
    });
    toast.success('Inquiry submitted successfully');
    reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit, () => toast.error('Please fix form errors'))} noValidate>
      <Input placeholder="Full name" aria-label="Full name" {...register('fullName')} />
      {errors.fullName && <p className="text-sm text-rose-600">{errors.fullName.message}</p>}
      <Input placeholder="Email" type="email" aria-label="Email" {...register('email')} />
      <Input placeholder="Phone" aria-label="Phone" {...register('phone')} />
      <Input placeholder="Company" aria-label="Company" {...register('company')} />
      <Textarea placeholder="How can we help you?" rows={5} aria-label="Message" {...register('message')} />
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</Button>
    </form>
  );
}
