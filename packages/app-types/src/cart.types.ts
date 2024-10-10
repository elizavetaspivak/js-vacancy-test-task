import { z } from 'zod';

import { cartSchema } from 'schemas';

export type Cart = z.infer<typeof cartSchema>;
