import { z } from 'zod';

import productService from 'resources/product/product.service';

import { validateMiddleware } from 'middlewares';

import { PaymentStatus, ProductStatus } from 'schemas';
import { AppKoaContext, AppRouter, Next, User } from 'types';

import cartService from '../cart.service';

const schema = z
  .object({
    productId: z.string().min(1, 'productId must be a long string'),
  })
  .strict();

interface ValidatedData extends z.infer<typeof schema> {
  user: User;
}

interface Request {
  body: {
    productId: string;
  };
}

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const { productId } = ctx.request.body;

  const isProductExists = await productService.exists({ _id: productId, productStatus: ProductStatus.ACTIVE });

  ctx.assertError(isProductExists, 'Product not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { productId } = ctx.validatedData;
  const { user } = ctx.state;

  const cart = await cartService.findOne({ productId, paymentStatus: PaymentStatus.INPROGRESS });

  if (cart) {
    await cartService.updateOne(
      {
        productId,
      },
      () => ({
        quantity: cart.quantity + 1,
      }),
    );

    ctx.status = 204;

    return;
  }

  await cartService.insertOne({
    productId,
    quantity: 1,
    userId: user._id,
    paymentStatus: PaymentStatus.INPROGRESS,
  });

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.post('/create', validator, validateMiddleware(schema), handler);
};
