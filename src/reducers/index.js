import { combineReducers } from 'redux';
import loginResponse from './LoginReducer';
import resetPasswordResponse from './ResetPasswordReducer';
import getPersonsDetailReducer from './getPersonsDetailReducer';
import contractedPersonReducer from './contractedPersonReducer';
import getAllZonesReducer from './GetAllZonesReducer';
import getQuarantineTypesReducer from './GetQuarantineTypesReducer';
import toastMessageReducer from './toastMessageReducer';

const reducers = combineReducers({
  loginResponse,
  resetPasswordResponse,
  getPersonsDetailReducer,
  contractedPersonReducer,
  getAllZonesReducer,
  getQuarantineTypesReducer,
  toastMessageReducer,
});

export default reducers;
