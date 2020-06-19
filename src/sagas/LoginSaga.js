import { put, call } from 'redux-saga/effects';
import loginActions from '../actions/LoginAction';
import routeToPathAction from '../actions/RouteToPathAction';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';

export default function* loginSaga(action) {
  try {
    const response = yield call(callFetchApi, apiUrls.login, {}, 'POST', action.payload);
    if (response.data !== undefined && response.data.success) {
      yield put({
        type: loginActions.LOGIN_SUCCESS,
        response: response.data,
      });

      if (!response.data.isTempUser) {
        yield put({
          type: routeToPathAction.ROUTE_TO_PATH,
          payload: { path: '/dashboard' },
        });
      }
    } else {
      yield put({
        type: loginActions.LOGIN_FAILURE,
        response: 'Unauthorized',
      });
    }
  } catch (e) {
    yield put({
      type: loginActions.LOGIN_FAILURE,
      response: 'Unauthorized',
    });
  }
}
