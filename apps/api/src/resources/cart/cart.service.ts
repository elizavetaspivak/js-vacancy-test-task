import db from 'db';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { cartSchema } from 'schemas';
import { Cart } from 'types';

const service = db.createService<Cart>(DATABASE_DOCUMENTS.CART, {
  schemaValidator: (obj) => cartSchema.parseAsync(obj),
});

export default service;
