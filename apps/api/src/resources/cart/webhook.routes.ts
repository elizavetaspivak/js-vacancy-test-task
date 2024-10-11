import { routeUtil } from '../../utils';
import webhook from './actions/paymentWebhook';

const webhookRoutes = routeUtil.getRoutes([webhook]);

export default {
  webhookRoutes,
};
