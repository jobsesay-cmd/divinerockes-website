import { z } from 'zod';
import { publishWorkflowSchema, seoSchema } from '@/domains/shared/schemas';
import { sanitizeRichText } from '@/lib/security/sanitize';

export const projectSchema = z.object({
  title: z.string().min(2).max(180),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  summary: z.string().max(280).optional(),
  description: z.string().transform((value: string) => sanitizeRichText(value)),
  location: z.string().max(120).optional(),
  completedOn: z.coerce.date().optional(),
  featured: z.boolean().default(false),
  categoryIds: z.array(z.string().cuid()).default([]),
  workflow: publishWorkflowSchema,
  seo: seoSchema.optional(),
});
