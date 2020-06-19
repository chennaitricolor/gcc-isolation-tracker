import { put, call } from 'redux-saga/effects';
import updateContractedPersonsAction from '../actions/updateContractedPersonsAction';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';

export default function* updateContractedPersonsSaga(action) {
  try {
    const api = apiUrls.updateContractedPersons.replace(':id', action.payload.patientId);
    const response = yield call(callFetchApi, api, {}, 'PUT', action.payload.contractedDetails);
    if (response.data !== undefined && response.data.success) {
      yield put({
        type: updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS_SUCCESS,
        response: 'Record Updated Successfully',
      });
    } else {
      yield put({
        type: updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS_FAILURE,
        response: 'Error while updating data...',
      });
    }
  } catch (error) {
    yield put({
      type: updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS_FAILURE,
      error,
    });
  }
}
