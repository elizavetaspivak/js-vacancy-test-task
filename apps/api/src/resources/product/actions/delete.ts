import { z } from 'zod';

import { validateMiddleware } from 'middlewares';

import { ProductStatus } from 'schemas';
import { AppKoaContext, AppRouter, Next } from 'types';

import productService from '../product.service';

const schema = z
  .object({
    productId: z.string().min(1, 'productId must be a long string'),
  })
  .strict();

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { productId } = ctx.validatedData;

  const isProductExists = await productService.exists({ _id: productId, productStatus: ProductStatus.ACTIVE });

  ctx.assertClientError(isProductExists, {
    productId: 'Product not found!',
  });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { productId } = ctx.validatedData;

  await productService.updateOne({ _id: productId }, () => ({ productStatus: ProductStatus.DELETED }));

  ctx.body = productId;

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.delete('/delete', validateMiddleware(schema), validator, handler);
};
