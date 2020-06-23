import { put, call } from 'redux-saga/effects';
import getPersonsDetailAction from '../actions/getPersonsDetailAction';
import addContractedPersonsAction from '../actions/addContractedPersonsAction';
import toastActions from '../actions/ToastAction';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';

export default function* addContractedPersonsSaga(action) {
  try {
    const response = yield call(callFetchApi, apiUrls.addContractedPersons, {}, 'POST', action.payload);
    if (response.data !== undefined && response.status === 200) {
      yield put({
        type: toastActions.SET_TOAST_MESSAGE,
        payload: 'Entry submitted successfully',
      });
      yield put({
        type: getPersonsDetailAction.GET_PERSONS_DETAILS,
      });
    } else {
      yield put({
        type: addContractedPersonsAction.ADD_CONTRACTED_PERSONS_FAILURE,
        response: 'Error while saving data...',
      });
    }
  } catch (error) {
    yield put({
      type: addContractedPersonsAction.ADD_CONTRACTED_PERSONS_FAILURE,
      error,
    });
  }
}
