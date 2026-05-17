import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email().max(254).transform((value) => value.trim().toLowerCase()),
  password: z.string().min(8).max(128),
  captchaToken: z.string().min(10).max(4096).optional(),
});