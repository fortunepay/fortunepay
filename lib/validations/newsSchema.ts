import { z } from 'zod';

export const NEWS_STATUSES = ['enabled', 'disabled'] as const;
export type NewsStatus = (typeof NEWS_STATUSES)[number];

export const newsSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required.')
    .max(200, 'Title must be 200 characters or less.'),
  content: z.string().min(1, 'Content is required.'),
  publishDate: z.string().min(1, 'Publish date is required.'),
  status: z.enum(NEWS_STATUSES, { message: 'Invalid status.' }),
});
