import actions from '../actions/ToastAction';

const defaultState = {
  toastMessage: null
};

const toastMessageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SET_TOAST_MESSAGE:
      return Object.assign({}, state, { toastMessage: action.payload });
    default:
      return state;
  }
};

export default toastMessageReducer;
