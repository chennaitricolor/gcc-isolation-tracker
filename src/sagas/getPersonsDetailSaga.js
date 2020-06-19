import { put, call } from 'redux-saga/effects';
import getPersonsDetailAction from '../actions/getPersonsDetailAction';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';

export default function* getPersonsDetailSaga(action) {
  try {
    const api = apiUrls.getPersonsDetails.replace(':id', action.payload.personId);
    const response = yield call(callFetchApi, api, {}, 'GET');
    if (response.data.success) {
      yield put({
        type: getPersonsDetailAction.GET_PERSONS_DETAILS_SUCCESS,
        payload: response.data.details,
      });
    } else {
      yield put({
        type: getPersonsDetailAction.GET_PERSONS_DETAILS_FAILURE,
        payload: 'Error in fetching Data',
      });
    }
  } catch (error) {
    yield put({
      type: getPersonsDetailAction.GET_PERSONS_DETAILS_FAILURE,
      payload: 'Error in fetching Data',
    });
  }
}
