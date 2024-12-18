import { z } from 'zod';

export const userValidationSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(3, { message: 'Email must be at least 3 characters long' })
    .max(30, { message: 'Email must not exceed 30 characters' })
    .refine((value) => !value.startsWith('.'), {
      message: 'Email cannot start with a dot',
    })
    .refine((value) => !value.endsWith('.'), {
      message: 'Email cannot end with a dot',
    })
    .refine((value) => !value.includes('..'), {
      message: 'Email cannot contain consecutive dots',
    })
    .refine((value) => value.split('@')[1]?.includes('.'), {
      message: 'Email must have a valid domain with a dot',
    })
    .refine(
      (value) =>
        ['gmail.com', 'yahoo.com', 'outlook.com'].includes(value.split('@')[1]),
      {
        message:
          'Email must belong to a valid domain (gmail.com, yahoo.com, outlook.com)',
      },
    ),
  pasword: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' }),
  role: z.enum(['admin', 'user']).default('user').optional(),
  isBlocked: z.boolean().optional().default(false),
});

export default userValidationSchema;
