import { z } from 'zod';

export const settingSchema = z.object({
  key: z.string().min(2).max(60),
  value: z.record(z.any()),
  isPublic: z.boolean().default(false),
  description: z.string().max(500).optional(),
});
