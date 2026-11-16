import { z } from 'zod';

export const createTokenSchema = z.object({
  email: z.email(),
  password: z.string().min(1).max(128),
});
export type CreateTokenInput = z.infer<typeof createTokenSchema>;

export const tokenResponseSchema = z.object({
  accessToken: z.string(),
  tokenType: z.literal('Bearer'),
  expiresIn: z.number().int().positive(),
});
export type TokenResponse = z.infer<typeof tokenResponseSchema>;
