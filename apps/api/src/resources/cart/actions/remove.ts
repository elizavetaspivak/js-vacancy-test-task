import { AppKoaContext, AppRouter, Next } from 'types';

import cartService from '../cart.service';

type ValidatedData = never;
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
  await cartService.deleteOne({ _id: ctx.request.params.id });

  ctx.body = { _id: ctx.request.params.id };
}

export default (router: AppRouter) => {
  router.delete('/:id', validator, handler);
};
