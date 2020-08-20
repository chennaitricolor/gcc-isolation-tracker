import { put, call } from 'redux-saga/effects';
import actions from '../actions/getZonesByTypeAction';
import { apiUrls } from '../utils/constants';
import { callFetchApi } from '../services/api';
import routeToPathAction from '../actions/RouteToPathAction';

export default function* getZonesBasedOnTypeSaga(action) {
  try {
    const api = apiUrls.getZonesByType.replace(':type', action.payload.addressType);
    const response = yield call(callFetchApi, api, {}, 'GET');
    if (response.data !== undefined) {
      yield put({
        type: actions.GET_ZONE_BY_TYPE_SUCCESS,
        payload: { zoneListing: response.data },
      });
    } else {
      yield put({
        type: actions.GET_ZONE_BY_TYPE_FAILURE,
        payload: 'Error in fetching Data',
      });
    }
  } catch (e) {
    if (e.response.status === 401) {
      yield put({
        type: routeToPathAction.ROUTE_TO_PATH,
        payload: { path: '/' },
      });
    } else {
      yield put({
        type: actions.GET_ZONE_BY_TYPE_FAILURE,
        payload: 'Error in fetching Data',
      });
    }
  }
}
