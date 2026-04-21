import { RoleType } from '@prisma/client';
import { z } from 'zod';

export const userCreateSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2).max(100),
  password: z.string().min(12).max(128),
  roleKeys: z.array(z.nativeEnum(RoleType)).min(1),
});

export const userUpdateSchema = userCreateSchema.partial().extend({
  isActive: z.boolean().optional(),
});
