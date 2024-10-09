import { z } from 'zod';

import { EMAIL_REGEX } from 'app-constants';

import { emailSchema, passwordSchema } from './common.schema';
import dbSchema from './db.schema';

export const userSchema = dbSchema
  .extend({
    email: z.string().toLowerCase().regex(EMAIL_REGEX, 'Email format is incorrect.'),
    passwordHash: z.string().nullable().optional(),
    lastRequest: z.date().optional(),
  })
  .strip();

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
