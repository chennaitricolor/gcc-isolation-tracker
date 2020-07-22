import actions from '../actions/getPersonsDetailAction';

const defaultState = {
  personsDetails: [],
  isLoading: false,
  error: '',
};

const getPersonsDetailReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.GET_PERSONS_DETAILS:
      return Object.assign({}, state, { isLoading: true });
    case actions.GET_PERSONS_DETAILS_SUCCESS:
      return Object.assign({}, state, { isLoading: false, personsDetails: payload });
    case actions.GET_PERSONS_DETAILS_FAILURE:
      return Object.assign({}, state, { isLoading: false, error: payload });
    default:
      return state;
  }
};

export default getPersonsDetailReducer;
