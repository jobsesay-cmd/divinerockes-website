import { z } from 'zod';
import { isCloudinaryUrl } from '@/lib/security/sanitize';

export const contactFormSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  company: z.string().optional(),
  message: z.string().min(20),
});

export const quoteFormSchema = contactFormSchema.extend({
  projectType: z.string().min(2),
  budgetRange: z.string().min(1),
  timeline: z.string().min(1),
});

export const cloudinaryImageSchema = z
  .string()
  .url()
  .refine((url) => isCloudinaryUrl(url), 'Only Cloudinary URLs are allowed');
