import { z } from 'zod';

export const passkeySchema = z.object({
  challenge: z
    .string()
    .min(1, 'Challenge is required'),
});

export type PasskeyFormData = z.infer<typeof passkeySchema>;
