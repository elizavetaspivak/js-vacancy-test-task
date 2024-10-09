import { z } from 'zod';

import { validateMiddleware } from 'middlewares';

import { SaleStatus } from 'schemas';
import { AppKoaContext, AppRouter, Next } from 'types';

import productService from '../product.service';

const schema = z.object({
  saleStatus: z.nativeEnum(SaleStatus),
});

type ValidatedData = z.infer<typeof schema>;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isProductExists = await productService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isProductExists, 'Product not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { saleStatus } = ctx.validatedData;

  await productService.updateOne({ _id: ctx.request.params?.id }, () => ({
    saleStatus,
  }));

  const product = await productService.findOne({ _id: ctx.request.params?.id });

  ctx.body = product;
}

export default (router: AppRouter) => {
  router.put('/:id', validator, validateMiddleware(schema), handler);
};
