import { routeUtil } from 'utils';

import list from './actions/list';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([list]);

const adminRoutes = routeUtil.getRoutes([list]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
