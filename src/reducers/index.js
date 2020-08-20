import { combineReducers } from 'redux';
import loginResponse from './LoginReducer';
import resetPasswordResponse from './ResetPasswordReducer';
import getPersonsDetailReducer from './getPersonsDetailReducer';
import contractedPersonReducer from './contractedPersonReducer';
import getAllZonesReducer from './getAllZonesReducer';
import getZonesBasedOnTypeReducer from './getZonesBasedOnTypeReducer';
import getAllWardsReducer from './getAllWardsReducer';
import getQuarantineTypesReducer from './GetQuarantineTypesReducer';
import toastMessageReducer from './toastMessageReducer';

const reducers = combineReducers({
  loginResponse,
  resetPasswordResponse,
  getPersonsDetailReducer,
  contractedPersonReducer,
  getAllZonesReducer,
  getZonesBasedOnTypeReducer,
  getAllWardsReducer,
  getQuarantineTypesReducer,
  toastMessageReducer,
});

export default reducers;
