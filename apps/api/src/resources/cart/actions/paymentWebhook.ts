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

const updateProducts = async (product: { productId: string; productQuantity: number }[]) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < product.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await productService.updateOne({ _id: product[i].productId }, (el) => ({
      quantity: el.quantity - product[i].productQuantity <= 0 ? 0 : el.quantity - product[i].productQuantity,
      saleStatus: el.quantity - product[i].productQuantity <= 0 ? SaleStatus.SOLD : SaleStatus.ON_SALE,
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

        const products = carts.results.map((cart) => ({ productId: cart.productId, productQuantity: cart.quantity }));

        await updateProducts(products);

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
