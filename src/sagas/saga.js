import { takeLatest } from 'redux-saga/effects';
import loginActions from '../actions/LoginAction';
import routesActions from '../actions/RouteToPathAction';
import getZonesAction from '../actions/GetZonesAction';
import resetPasswordActions from '../actions/ResetPasswordAction';
import getPersonsDetailAction from '../actions/getPersonsDetailAction';
import addContractedPersonsAction from '../actions/addContractedPersonsAction';
import updateContractedPersonsAction from '../actions/updateContractedPersonsAction';
import logoutActions from '../actions/LogoutAction';
import loginSaga from './LoginSaga';
import routesSaga from './RouteUrlsSaga';
import getAllZones from './GetAllZonesSaga';
import resetPasswordSaga from './ResetPasswordSaga';
import getPersonsDetailSaga from './getPersonsDetailSaga';
import addContractedPersonsSaga from './addContractedPersonSaga';
import updateContractedPersonsSaga from './updateContractedPersonsSaga';
import logoutSaga from './LogoutSaga';


export default function* saga() {
  yield takeLatest(loginActions.INITIATE_LOGIN, loginSaga);
  yield takeLatest(routesActions.ROUTE_TO_PATH, routesSaga);
  yield takeLatest(getZonesAction.GET_ALL_ZONE, getAllZones);
  yield takeLatest(resetPasswordActions.RESET_PASSWORD, resetPasswordSaga);
  yield takeLatest(getPersonsDetailAction.GET_PERSONS_DETAILS, getPersonsDetailSaga);
  yield takeLatest(addContractedPersonsAction.ADD_CONTRACTED_PERSONS, addContractedPersonsSaga);
  yield takeLatest(updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS, updateContractedPersonsSaga);
  yield takeLatest(logoutActions.INITIATE_LOGOUT, logoutSaga);
}
