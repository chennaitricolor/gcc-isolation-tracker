import { put, call } from 'redux-saga/effects';
import actions from '../actions/GetQuarantineTypesAction';
import { apiUrls } from '../utils/constants';
import { callFetchApi } from '../services/api';
import routeToPathAction from '../actions/RouteToPathAction';

export default function* getQuarantineTypes() {
    try {
        const response = yield call(callFetchApi, apiUrls.getQuarantineTypes, {}, 'GET');
        if (response.data !== undefined) {
            yield put({
                type: actions.GET_QUARANTINE_TYPES_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: actions.GET_QUARANTINE_TYPES_FAILURE,
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
                type: actions.GET_QUARANTINE_TYPES_FAILURE,
                payload: 'Error in fetching Data',
            });
        }
    }
}
