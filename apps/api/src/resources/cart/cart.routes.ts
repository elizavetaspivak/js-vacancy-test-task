import { routeUtil } from 'utils';

import count from './actions/count';
import create from './actions/create';
import list from './actions/list';
import remove from './actions/remove';
import update from './actions/update';

const privateRoutes = routeUtil.getRoutes([count, create, list, update, remove]);

export default {
  privateRoutes,
};
