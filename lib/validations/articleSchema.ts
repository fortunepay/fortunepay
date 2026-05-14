import { z } from 'zod';

export const ARTICLE_STATUSES = ['enabled', 'disabled'] as const;
export type ArticleStatus = (typeof ARTICLE_STATUSES)[number];

export const articleSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required.')
    .max(200, 'Title must be 200 characters or less.'),
  content: z.string().min(1, 'Content is required.'),
  publishDate: z.string().min(1, 'Publish date is required.'),
  status: z.enum(ARTICLE_STATUSES, { message: 'Invalid status.' }),
});
