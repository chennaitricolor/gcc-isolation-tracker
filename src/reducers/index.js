import { combineReducers } from 'redux';
import loginResponse from './LoginReducer';
import resetPasswordResponse from './ResetPasswordReducer';
import getPersonsDetailReducer from './getPersonsDetailReducer';
import contractedPersonReducer from './contractedPersonReducer';
import getAllZonesReducer from './GetAllZonesReducer';

const reducers = combineReducers({
  loginResponse,
  resetPasswordResponse,
  getPersonsDetailReducer,
  contractedPersonReducer,
  getAllZonesReducer,
});

export default reducers;
