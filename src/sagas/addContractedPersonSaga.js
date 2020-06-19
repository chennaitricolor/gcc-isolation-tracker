import { put, call } from 'redux-saga/effects';
import addContractedPersonsAction from '../actions/addContractedPersonsAction';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';

export default function* addContractedPersonsSaga(action) {
  try {
    const response = yield call(callFetchApi, apiUrls.addContractedPersons, {}, 'POST', action.payload.contractedDetails);
    if (response.data !== undefined && response.data.success) {
      yield put({
        type: addContractedPersonsAction.ADD_CONTRACTED_PERSONS_SUCCESS,
        response: 'Record Added Successfully',
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
