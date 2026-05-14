import { z } from 'zod';

export const bannerSchema = z
  .object({
    description: z
      .string()
      .min(5, 'Description must be at least 5 characters.')
      .max(300, 'Description must be at most 300 characters.'),
    startDate: z.string().min(1, 'Start date is required.'),
    endDate: z.string().min(1, 'End date is required.'),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: 'End date must be after start date.',
    path: ['endDate'],
  });

export type BannerSchemaType = z.infer<typeof bannerSchema>;
