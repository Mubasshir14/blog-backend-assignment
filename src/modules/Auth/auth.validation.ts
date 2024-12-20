import { z } from 'zod';

export const userRegisterValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(4, {
        message: 'Name is required and must conatin at least 4 characters .',
      })
      .max(200, { message: 'Name must not exceed 200 characters.' })
      .regex(/^[a-zA-Z\s]+$/, {
        message: 'Name can only contain letters and spaces.',
      }),

    email: z
      .string()
      .trim()
      .email({ message: 'Invalid email address format.' })
      .min(3, {
        message: 'Email is required and must contain at least 3 characters.',
      })
      .max(100, { message: 'Email must not exceed 100 characters.' })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: 'Email must be a valid format with no spaces.',
      })
      .regex(
        /^(?!.*\.\.)(?!.*@.*@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        {
          message:
            'Email must not contain consecutive dots or invalid characters.',
        },
      )
      .refine((email) => !email.endsWith('.'), {
        message: 'Email must not end with a period.',
      })
      .refine((email) => !/^[0-9]/.test(email), {
        message: 'Email must not start with a number.',
      }),

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
