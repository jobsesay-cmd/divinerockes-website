import { z } from 'zod';

export const analyticsEventSchema = z.object({
  eventName: z.string().min(2).max(80),
  path: z.string().max(255).optional(),
  metadata: z.record(z.any()).optional(),
});
