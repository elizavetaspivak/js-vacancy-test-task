import { routeUtil } from 'utils';

import get from './actions/get';
import signIn from './actions/sign-in';
import signOut from './actions/sign-out';
import signUp from './actions/sign-up';

const publicRoutes = routeUtil.getRoutes([signUp, signIn, signOut]);

const privateRoutes = routeUtil.getRoutes([get]);

export default {
  publicRoutes,
  privateRoutes,
};
