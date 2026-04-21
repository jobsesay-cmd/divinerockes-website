import { z } from 'zod';
import { quoteStatusSchema } from '@/domains/shared/schemas';

export const inquirySchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  subject: z.string().max(120).optional(),
  message: z.string().min(10).max(5000),
  sourcePage: z.string().max(200).optional(),
});

export const quoteSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  company: z.string().max(120).optional(),
  serviceType: z.string().min(2).max(120),
  budgetMin: z.coerce.number().positive().optional(),
  budgetMax: z.coerce.number().positive().optional(),
  timeline: z.string().max(120).optional(),
  requirements: z.string().min(10).max(10000),
});

export const quoteStatusUpdateSchema = z.object({
  status: quoteStatusSchema,
});
