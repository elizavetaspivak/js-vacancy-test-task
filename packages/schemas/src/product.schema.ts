import { z } from 'zod';

import dbSchema from './db.schema';

export enum SaleStatus {
  SOLD = 'sold',
  ON_SALE = 'onSale',
}

export const productSchema = dbSchema
  .extend({
    title: z.string(),
    price: z.number(),
    quantity: z.number(),

    userId: z.string(),

    imageUrl: z.string(),
    saleStatus: z.nativeEnum(SaleStatus),
    fileReference: z.string(),
  })
  .strict();

export const createSchema = z.object({
  title: z.string().min(1, 'Cannot be empty'),
  price: z.coerce
    .number({
      invalid_type_error: 'Cannot be empty',
      required_error: 'Cannot be empty',
      description: 'Cannot be empty',
    })
    .min(1, 'Cannot be empty'),
  quantity: z
    .number({
      invalid_type_error: 'Cannot be empty',
      required_error: 'Cannot be empty',
      description: 'Cannot be empty',
    })
    .min(1, 'Cannot be empty'),
});
