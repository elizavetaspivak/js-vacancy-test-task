import { routeUtil } from 'utils';

import checkout from './actions/checkout';
import count from './actions/count';
import create from './actions/create';
import history from './actions/history';
import list from './actions/list';
import webhook from './actions/paymentWebhook';
import remove from './actions/remove';
import update from './actions/update';

const privateRoutes = routeUtil.getRoutes([count, create, list, update, remove, checkout, history]);
const webhookRoutes = routeUtil.getRoutes([webhook]);

export default {
  privateRoutes,
  webhookRoutes,
};
