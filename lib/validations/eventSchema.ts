import { z } from 'zod';

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const EVENT_CATEGORIES = ['News', 'Promo', 'Event'] as const;
export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export const eventClientSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(120, 'Title must be 120 characters or less'),
    description: z
      .string()
      .min(1, 'Description is required')
      .max(1000, 'Description must be 1000 characters or less'),
    category: z.enum(EVENT_CATEGORIES, { message: 'Invalid category' }),
    startDate: z
      .string()
      .min(1, 'Start date is required')
      .refine((v) => new Date(v) >= today(), {
        message: 'Start date cannot be in the past',
      }),
    endDate: z.string().min(1, 'End date is required'),
    bannerImage: z.instanceof(File).optional().nullable(),
  })
  .refine(
    (d) => {
      if (!d.startDate || !d.endDate) return true;
      return new Date(d.endDate) >= new Date(d.startDate);
    },
    { message: 'End date must be on or after start date', path: ['endDate'] },
  );

export type EventClientValues = z.infer<typeof eventClientSchema>;

export const eventServerSchema = z
  .object({
    title: z.string().min(1).max(120),
    description: z.string().min(1).max(1000),
    category: z.enum(EVENT_CATEGORIES),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
  })
  .refine((d) => new Date(d.endDate) >= new Date(d.startDate), {
    message: 'End date must be on or after start date',
    path: ['endDate'],
  });
