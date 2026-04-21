import { z } from 'zod';
import { publishWorkflowSchema, seoSchema } from '@/domains/shared/schemas';
import { sanitizeRichText } from '@/lib/security/sanitize';

export const serviceSchema = z.object({
  name: z.string().min(2).max(160),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  summary: z.string().max(280).optional(),
  content: z.string().transform((value: string) => sanitizeRichText(value)),
  workflow: publishWorkflowSchema,
  seo: seoSchema.optional(),
});
