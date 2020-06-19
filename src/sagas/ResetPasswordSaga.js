import { put, call } from 'redux-saga/effects';
import resetPasswordActions from '../actions/ResetPasswordAction';
import routeToPathAction from '../actions/RouteToPathAction';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';

export default function* resetPasswordSaga(action) {
    try {
        const response = yield call(callFetchApi, apiUrls.resetPassword, {}, 'PUT', action.payload);
        if (response.data !== undefined && response.data.success) {
            yield put({
                type: resetPasswordActions.RESET_PASSWORD_SUCCESS,
                response: 'Authenticated',
            });

                yield put({
                    type: routeToPathAction.ROUTE_TO_PATH,
                    payload: { path: '/dashboard' },
                });

        } else {
            yield put({
                type: resetPasswordActions.RESET_PASSWORD_FAILURE,
                response: 'Unauthorized',
            });
        }
    } catch (e) {
        yield put({
            type: resetPasswordActions.RESET_PASSWORD_FAILURE,
            response: 'Unauthorized',
        });
    }
}
