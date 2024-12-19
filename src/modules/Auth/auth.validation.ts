import { z } from 'zod';

export const userRegisterValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(4, {
        message: 'Name is required and must conatin at least 4 characters .',
      })
      .max(200, { message: 'Name must not exceed 100 characters.' })
      .regex(/^[a-zA-Z\s]+$/, {
        message: 'Name can only contain letters and spaces.',
      }),

    email: z
      .string()
      .trim()
      .email({ message: 'Invalid email address.' })
      .min(1, { message: 'Email is required' })
      .max(100, { message: 'Email must not exceed 100 characters.' }),

    password: z.string().trim().min(4, {
      message:
        'Password is required and must be length of it at least 4 characters',
    }),

    role: z
      .enum(['admin', 'user'], {
        errorMap: () => ({ message: "Role must be either 'admin' or 'user'." }),
      })
      .optional()
      .default('user'),

    isBlocked: z.boolean().optional().default(false),
  }),
});

export const userLoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email({ message: 'Invalid email address.' })
      .min(1, { message: 'Email is required' })
      .max(100, { message: 'Email must not exceed 100 characters.' }),

    password: z.string().trim().min(4, {
      message:
        'Password is required and must be length of it at least 4 characters',
    }),
  }),
});

export const AuthValidation = {
  userRegisterValidationSchema,
  userLoginValidationSchema,
};
