import { put, call } from 'redux-saga/effects';
import updateContractedPersonsAction from '../actions/updateContractedPersonsAction';
import getPersonsDetailAction from '../actions/getPersonsDetailAction';
import { callFetchApi } from '../services/api';
import { apiUrls } from '../utils/constants';

export default function* updateContractedPersonsSaga(action) {
  switch (action.type) {
    case updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS:
      try {
        const api = apiUrls.addContractedPersonEnquiry.replace(':id', action.payload.attendanceDetails.person);
        const response = yield call(callFetchApi, api, {}, 'POST', action.payload.attendanceDetails);
        if (response.data !== undefined && response.status === 200) {
          yield put({
            type: updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS_SUCCESS,
            response: 'Record Updated Successfully',
          });
          yield put({
            type: getPersonsDetailAction.GET_PERSONS_DETAILS,
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
      break;
    case updateContractedPersonsAction.CLOSE_CONTRACTED_PERSON:
      const api = apiUrls.updateContractedPersons.replace(':id', `${action.payload.id}/closeCase`);
      const response = yield call(callFetchApi, api, {}, 'PUT', { closeReason: action.payload.reason });
      try {
        if (response.data !== undefined && response.status === 200) {
          yield put({
            type: updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS_SUCCESS,
            response: 'Record closed Successfully',
          });
          yield put({
            type: getPersonsDetailAction.GET_PERSONS_DETAILS,
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
      break;
    case updateContractedPersonsAction.DELETE_CONTRACTED_PERSON:
      try {
        const api = apiUrls.updateContractedPersons.replace(':id', `${action.payload.id}/deleteCase`);
        const response = yield call(callFetchApi, api, {}, 'PUT', { deleteReason: action.payload.reason });
        if (response.data !== undefined && response.status === 200) {
          yield put({
            type: updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS_SUCCESS,
            response: 'Record deleted Successfully',
          });
          yield put({
            type: getPersonsDetailAction.GET_PERSONS_DETAILS,
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
      break;
    case updateContractedPersonsAction.DUPLICATE_CONTRACTED_PERSON:
      try {
        const api = apiUrls.updateContractedPersons.replace(':id', `${action.payload.id}/duplicate`);
        const response = yield call(callFetchApi, api, {}, 'POST', action.payload.details);
        if (response.data !== undefined && response.status === 200) {
          yield put({
            type: updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS_SUCCESS,
            response: 'Entry recorded Successfully',
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
      break;

    default:
      break;
  }
}
