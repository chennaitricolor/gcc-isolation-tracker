import actions from '../actions/getPersonsDetailAction';
import logoutActions from '../actions/LogoutAction';

const defaultState = {
  personsDetails: [],
  isLoading: false,
  error: '',
};

const getPersonsDetailReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.GET_PERSONS_DETAILS:
      return Object.assign({}, state, { isLoading: true, personsDetails: [], error: '' });
    case actions.GET_PERSONS_DETAILS_SUCCESS:
      return Object.assign({}, state, { isLoading: false, personsDetails: payload, error: '' });
    case actions.GET_PERSONS_DETAILS_FAILURE:
      return Object.assign({}, state, { isLoading: false, personsDetails: [], error: payload });
    case logoutActions.LOGOUT_SUCCESS:
      return Object.assign({}, state, { isLoading: false, personsDetails: [], error: '' });
    default:
      return state;
  }
};

export default getPersonsDetailReducer;
