import multer from '@koa/multer';
import { z } from 'zod';

import { validateMiddleware } from 'middlewares';
import { uploadPhoto } from 'services/firebase-storage/firebase-storage.service';

import { ProductStatus, SaleStatus } from 'schemas';
import { AppKoaContext, AppRouter, Next } from 'types';

import productService from '../product.service';

const upload = multer();

const schema = z.object({
  file: z.any(),
  title: z.string().min(1, 'Title is required'),
  price: z.string(),
  quantity: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { title, price } = ctx.validatedData;

  const { file } = ctx.request;

  const isProductExists = await productService.exists({ title, price: +price });

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  ctx.assertClientError(!isProductExists, {
    email: 'Product with this title and price is already exist',
  });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const { file } = ctx.request;
  const { title, price, quantity } = ctx.validatedData;

  const photoUrl = await uploadPhoto(file, ctx);

  if (photoUrl) {
    ctx.body = await productService.insertOne({
      title,
      saleStatus: SaleStatus.ON_SALE,
      price: +price,
      quantity: +quantity,
      userId: user._id,
      imageUrl: photoUrl,
      fileReference: file.originalname,
      productStatus: ProductStatus.ACTIVE,
    });
  }
}

export default (router: AppRouter) => {
  router.post('/upload', upload.single('file'), validateMiddleware(schema), validator, handler);
};
