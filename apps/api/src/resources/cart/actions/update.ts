import { z } from 'zod';

import { validateMiddleware } from 'middlewares';

import { AppKoaContext, AppRouter, Next } from 'types';

import cartService from '../cart.service';

const schema = z.object({
  quantity: z.number().int().positive(),
});

type ValidatedData = z.infer<typeof schema>;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isCartExists = await cartService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isCartExists, 'Product not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { quantity } = ctx.validatedData;

  await cartService.updateOne({ _id: ctx.request.params?.id }, () => ({
    quantity,
  }));

  const cart = await cartService.aggregate([
    {
      $match: {
        _id: ctx.request.params?.id,
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'productArray',
      },
    },
    {
      $addFields: {
        product: { $arrayElemAt: ['$productArray', 0] },
      },
    },
    {
      $project: {
        productArray: 0,
        productId: 0,
      },
    },
  ]);

  // eslint-disable-next-line prefer-destructuring
  ctx.body = cart[0];
}

export default (router: AppRouter) => {
  router.put('/:id', validator, validateMiddleware(schema), handler);
};
