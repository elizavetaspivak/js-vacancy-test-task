import { z } from 'zod';

import { signInSchema, signUpSchema, userSchema } from 'schemas';

export type User = z.infer<typeof userSchema>;

export type SignInParams = z.infer<typeof signInSchema>;
export type SignUpParams = z.infer<typeof signUpSchema>;
