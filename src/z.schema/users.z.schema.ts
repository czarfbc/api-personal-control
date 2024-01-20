import { z } from 'zod';

export const createSchemaUsers = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export const updateSchemaUsers = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  oldPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .optional(),
  newPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  user_id: z.string().uuid(),
});

export const payloadSchema = z.object({
  sub: z.string(),
});
