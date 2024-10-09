import { z } from 'zod';

import { validateMiddleware } from 'middlewares';
import { stringUtil } from 'utils';

import { paginationSchema, SaleStatus } from 'schemas';
import { AppKoaContext, AppRouter, NestedKeys, Product } from 'types';

import productService from '../product.service';

const schema = paginationSchema.extend({
  filter: z
    .object({
      price: z
        .object({
          from: z.string().optional(),
          to: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { page = 1, perPage = 5, sort, filter, searchValue } = ctx.validatedData;

  const filterOptions: { [key: string]: any }[] = [{ saleStatus: SaleStatus.ON_SALE }];

  if (searchValue) {
    const searchPattern = stringUtil.escapeRegExpString(searchValue as string);

    const searchFields: NestedKeys<Product>[] = ['title'];

    filterOptions.push({
      $or: searchFields.map((field) => ({ [field]: { $regex: searchPattern } })),
    });
  }

  if (filter) {
    const { price, ...otherFilters } = filter;

    if (price) {
      const { from, to } = price;

      filterOptions.push({
        price: {
          ...(from && { $gte: +from }),
          ...(to && { $lt: +to }),
        },
      });
    }

    Object.entries(otherFilters).forEach(([key, value]) => {
      filterOptions.push({ [key]: value });
    });
  }

  ctx.body = await productService.find(
    { ...(filterOptions.length && { $and: filterOptions }) },
    { page: +page, perPage: +perPage },
    { sort },
  );
}

export default (router: AppRouter) => {
  router.get('/pagination', validateMiddleware(schema), handler);
};
