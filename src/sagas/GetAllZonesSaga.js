import { put, call } from 'redux-saga/effects';
import actions from '../actions/GetZonesAction';
import { apiUrls } from '../utils/constants';
import { callFetchApi } from '../services/api';
import routeToPathAction from '../actions/RouteToPathAction';

export default function* getAllZones() {
  try {
    const response = yield call(callFetchApi, apiUrls.getZones, {}, 'GET');
    const wardsMappingResponse = yield call(callFetchApi, apiUrls.getWardsMapping, {}, 'GET');
    if (response.data !== undefined && wardsMappingResponse.data !== undefined) {
      yield put({
        type: actions.GET_ALL_ZONES_SUCCESS,
        payload: { zonePayload: response.data, wardsMappingPayload: wardsMappingResponse.data },
      });
    } else {
      yield put({
        type: actions.GET_ALL_ZONES_FAILURE,
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
        type: actions.GET_ALL_ZONES_FAILURE,
        payload: 'Error in fetching Data',
      });
    }
  }
}
