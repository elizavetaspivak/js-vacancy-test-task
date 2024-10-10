import { PaymentStatus } from 'schemas';
import { AppKoaContext, AppRouter } from 'types';

import cartService from '../cart.service';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const carts = await cartService.find({
    userId: user._id,
    paymentStatus: PaymentStatus.INPROGRESS,
  });

  ctx.body = carts.results.length;
}

export default (router: AppRouter) => {
  router.get('/counts', handler);
};
