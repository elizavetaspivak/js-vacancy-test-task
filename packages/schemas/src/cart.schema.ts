import { z } from 'zod';

import dbSchema from './db.schema';

export enum PaymentStatus {
  SUCCEDED = 'succeded',
  INPROGRESS = 'inProgress',
}

export const cartSchema = dbSchema
  .extend({
    productId: z.string(),
    userId: z.string(),

    paymentDate: z.date().optional(),
    quantity: z.number().int().positive(),

    paymentStatus: z.nativeEnum(PaymentStatus),
  })
  .strict();
