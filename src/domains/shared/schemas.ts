import { ContentStatus, QuoteStatus } from '@prisma/client';
import { z } from 'zod';
import { isCloudinaryUrl } from '@/lib/security/sanitize';

export const idSchema = z.object({ id: z.string().cuid() });
export const contentStatusSchema = z.nativeEnum(ContentStatus);
export const quoteStatusSchema = z.nativeEnum(QuoteStatus);

export const seoSchema = z.object({
  title: z.string().max(120).optional(),
  description: z.string().max(200).optional(),
  keywords: z.array(z.string().max(50)).default([]),
  canonicalUrl: z.string().url().optional(),
  ogImageUrl: z
    .string()
    .url()
    .refine((url: string) => isCloudinaryUrl(url), 'Only Cloudinary image URLs are allowed')
    .optional(),
  noIndex: z.boolean().default(false),
  structuredData: z.record(z.any()).optional(),
});

export const publishWorkflowSchema = z.object({
  status: contentStatusSchema,
  publishedAt: z.coerce.date().optional(),
}).superRefine((value: { status: string; publishedAt?: Date }, ctx: { addIssue: (issue: unknown) => void }) => {
  if (value.status === ContentStatus.SCHEDULED && !value.publishedAt) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'publishedAt is required when status is SCHEDULED' });
  }
});
