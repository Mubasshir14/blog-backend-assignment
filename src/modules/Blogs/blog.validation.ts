import { z } from 'zod';

export const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, { message: 'Title must be at least 5 characters long' })
      .max(300, { message: 'Title cannot exceed 300 characters' }),
    content: z
      .string()
      .min(50, { message: 'Content must be at least 50 characters long' })
      .max(5000, { message: 'Content cannot exceed 5000 characters' }),
    author: z.string().optional(),
    isPublished: z.boolean().optional().default(false),
  }),
});

export const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, { message: 'Title must be at least 5 characters long' })
      .max(300, { message: 'Title cannot exceed 300 characters' })
      .optional(),
    content: z
      .string()
      .min(50, { message: 'Content must be at least 50 characters long' })
      .max(5000, { message: 'Content cannot exceed 5000 characters' })
      .optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
