import { z } from 'zod';
import { publishWorkflowSchema, seoSchema } from '@/domains/shared/schemas';
import { isCloudinaryUrl, sanitizeRichText } from '@/lib/security/sanitize';

export const newsSchema = z.object({
  title: z.string().min(2).max(180),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(280).optional(),
  body: z.string().transform((value: string) => sanitizeRichText(value)),
  coverImageUrl: z
    .string()
    .url()
    .refine((url: string) => isCloudinaryUrl(url), 'Only Cloudinary image URLs are allowed')
    .optional(),
  workflow: publishWorkflowSchema,
  seo: seoSchema.optional(),
});
