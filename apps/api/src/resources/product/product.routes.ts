import { routeUtil } from '../../utils';
import remove from './actions/delete';
import list from './actions/list';
import listWithPagination from './actions/listWithPagination';
import upload from './actions/upload';
import update from './actions/update';

const privateRoutes = routeUtil.getRoutes([listWithPagination, list, upload, update, remove]);

export default {
  privateRoutes,
};
