import actions from '../actions/LoginAction';
import logoutActions from '../actions/LogoutAction';

const defaultState = {
  loginMessage: null,
};

const loginResponse = (state = defaultState, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      sessionStorage.setItem('region', action.response.region);
      return Object.assign({}, state, { loginMessage: action.response });
    case actions.LOGIN_FAILURE:
      return Object.assign({}, state, { loginMessage: action.response });
    case logoutActions.LOGOUT_SUCCESS:
      return Object.assign({}, state, { loginMessage: null });
    default:
      return state;
  }
};

export default loginResponse;
