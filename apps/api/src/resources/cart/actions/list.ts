import { PaymentStatus } from 'schemas';
import { AppKoaContext, AppRouter } from 'types';

import cartService from '../cart.service';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  ctx.body = await cartService.aggregate([
    {
      $match: {
        userId: user._id,
        paymentStatus: PaymentStatus.INPROGRESS,
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
}

export default (router: AppRouter) => {
  router.get('/list', handler);
};
