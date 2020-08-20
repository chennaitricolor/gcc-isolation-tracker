import { takeLatest } from 'redux-saga/effects';
import loginActions from '../actions/LoginAction';
import routesActions from '../actions/RouteToPathAction';
import getAllZonesAction from '../actions/getAllZonesAction';
import getZonesByTypeAction from '../actions/getZonesByTypeAction';
import getWardsAction from '../actions/getWardsAction';
import getQuarantineTypesAction from '../actions/GetQuarantineTypesAction';
import resetPasswordActions from '../actions/ResetPasswordAction';
import getPersonsDetailAction from '../actions/getPersonsDetailAction';
import addContractedPersonsAction from '../actions/addContractedPersonsAction';
import updateContractedPersonsAction from '../actions/updateContractedPersonsAction';
import logoutActions from '../actions/LogoutAction';
import loginSaga from './LoginSaga';
import routesSaga from './RouteUrlsSaga';
import getZonesBasedOnTypeSaga from './getZonesBasedOnTypeSaga';
import getAllWardsSaga from './getAllWardsSaga';
import resetPasswordSaga from './ResetPasswordSaga';
import getPersonsDetailSaga from './getPersonsDetailSaga';
import addContractedPersonsSaga from './addContractedPersonSaga';
import updateContractedPersonsSaga from './updateContractedPersonsSaga';
import getQuarantineTypesSaga from './GetQuaratineTypesSaga';
import logoutSaga from './LogoutSaga';
import getAllZonesSaga from './getAllZonesSaga';

export default function* saga() {
  yield takeLatest(loginActions.INITIATE_LOGIN, loginSaga);
  yield takeLatest(routesActions.ROUTE_TO_PATH, routesSaga);
  yield takeLatest(getAllZonesAction.GET_ALL_ZONES, getAllZonesSaga);
  yield takeLatest(getZonesByTypeAction.GET_ZONE_BY_TYPE, getZonesBasedOnTypeSaga);
  yield takeLatest(getWardsAction.GET_ALL_WARDS, getAllWardsSaga);
  yield takeLatest(resetPasswordActions.RESET_PASSWORD, resetPasswordSaga);
  yield takeLatest(getPersonsDetailAction.GET_PERSONS_DETAILS, getPersonsDetailSaga);
  yield takeLatest(addContractedPersonsAction.ADD_CONTRACTED_PERSONS, addContractedPersonsSaga);
  yield takeLatest(
    [
      updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS,
      updateContractedPersonsAction.CLOSE_CONTRACTED_PERSON,
      updateContractedPersonsAction.DELETE_CONTRACTED_PERSON,
      updateContractedPersonsAction.DUPLICATE_CONTRACTED_PERSON,
    ],
    updateContractedPersonsSaga,
  );
  yield takeLatest(logoutActions.INITIATE_LOGOUT, logoutSaga);
  yield takeLatest(getQuarantineTypesAction.GET_QUARANTINE_TYPE, getQuarantineTypesSaga);
}
