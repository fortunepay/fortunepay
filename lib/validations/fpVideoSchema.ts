import { z } from 'zod';

export const VIDEO_STATUSES = ['enabled', 'disabled'] as const;
export type VideoStatus = (typeof VIDEO_STATUSES)[number];

const youtubeRegex =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=[\w-]{11}|embed\/[\w-]{11}|shorts\/[\w-]{11})|youtu\.be\/[\w-]{11})([?&].*)?$/;

export const fpVideoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required.')
    .max(150, 'Title must be 150 characters or less.'),
  youtubeUrl: z
    .string()
    .min(1, 'YouTube URL is required.')
    .regex(youtubeRegex, 'Must be a valid YouTube video URL.'),
  status: z.enum(VIDEO_STATUSES, { message: 'Invalid status.' }),
});

export type FpVideoSchemaType = z.infer<typeof fpVideoSchema>;
