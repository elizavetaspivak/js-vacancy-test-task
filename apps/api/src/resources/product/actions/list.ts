import { ProductStatus } from 'schemas';
import { AppKoaContext, AppRouter } from 'types';

import productService from '../product.service';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  ctx.body = await productService.find(
    { userId: user._id, productStatus: ProductStatus.ACTIVE },
    { page: 1, perPage: 100000 },
    { sort: { createdOn: 'desc' } },
  );
}

export default (router: AppRouter) => {
  router.get('/private', handler);
};
