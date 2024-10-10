import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';
import { securityUtil } from 'utils';

import { signUpSchema } from 'schemas';
import { AppKoaContext, AppRouter, Next, SignUpParams } from 'types';

async function validator(ctx: AppKoaContext<SignUpParams>, next: Next) {
  const { email } = ctx.validatedData;

  const isUserExists = await userService.exists({ email });

  ctx.assertClientError(!isUserExists, {
    email: 'User with this email is already registered',
  });

  await next();
}

async function handler(ctx: AppKoaContext<SignUpParams>) {
  const { email, password } = ctx.validatedData;

  const hash = await securityUtil.getHash(password);

  await userService.insertOne({
    email,
    passwordHash: hash,
  });

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.post('/sign-up', validateMiddleware(signUpSchema), validator, handler);
};
