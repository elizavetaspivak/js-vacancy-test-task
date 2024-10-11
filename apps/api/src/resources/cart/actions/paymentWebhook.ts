import bodyParser from 'koa-bodyparser';

import productService from 'resources/product/product.service';

import config from 'config';

import { SaleStatus } from 'schemas';
import { PaymentStatus } from 'schemas/src/cart.schema';
import { AppKoaContext, AppRouter } from 'types';

import cartService from '../cart.service';

const endpointSecret = config.STRIPE_ENDPOINT_SECRET;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(config.STRIPE_KEY);

const updateProducts = async (productIds: string[]) => {
  for (const id of productIds) {
    // eslint-disable-next-line no-await-in-loop
    await productService.updateOne({ _id: id }, (el) => ({
      quantity: el.quantity - 1 <= 0 ? 0 : el.quantity - 1,
      saleStatus: el.quantity - 1 <= 0 ? SaleStatus.SOLD : SaleStatus.ON_SALE,
    }));
  }
};

async function handler(ctx: AppKoaContext) {
  const sig = ctx.request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(ctx.request.rawBody, sig, endpointSecret);
  } catch (err) {
    ctx.status = 400;
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const intent = event.data.object;

      if (intent.payment_status === 'paid') {
        const carts = await cartService.find({
          userId: intent.client_reference_id,
          paymentStatus: PaymentStatus.INPROGRESS,
        });

        const productIds = carts.results.map((cart) => cart.productId);

        await updateProducts(productIds);

        await cartService.updateMany(
          { userId: intent.client_reference_id, paymentStatus: PaymentStatus.INPROGRESS },
          () => ({
            paymentStatus: PaymentStatus.SUCCEDED,
            paymentDate: new Date(),
          }),
        );
      }

      break;
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.post('/webhook', bodyParser({ enableTypes: ['json'] }), handler);
};
