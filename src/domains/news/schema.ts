import { z } from 'zod';
import { publishWorkflowSchema, seoSchema } from '@/domains/shared/schemas';
import { isCloudinaryUrl, sanitizeRichText } from '@/lib/security/sanitize';

export const newsCategorySchema = z.enum([
  'PROJECT_UPDATE',
  'ANNOUNCEMENT',
  'INSIGHT',
  'EVENT',
]);

export const newsSchema = z.object({
  title: z.string().min(2).max(180),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(280).optional(),
  body: z.string().transform((value) => sanitizeRichText(value)),
  coverImageUrl: z
    .string()
    .url()
    .refine((url) => isCloudinaryUrl(url), 'Only Cloudinary image URLs are allowed')
    .optional(),

  // NEW: admin-facing classification fields
  category: newsCategorySchema,
  isFeatured: z.boolean().default(false),

  workflow: publishWorkflowSchema,
  seo: seoSchema.optional(),
});