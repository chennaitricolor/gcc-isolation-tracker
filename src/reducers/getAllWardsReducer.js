import actions from '../actions/getWardsAction';
import toastActions from '../actions/ToastAction';
import logoutActions from '../actions/LogoutAction';

const defaultState = {
  allWards: [],
  allWardsError: '',
  isLoading: false,
};

const getAllWardsReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.GET_ALL_WARDS:
      return Object.assign({}, state, { isLoading: true, allWards: [], allWardsError: '' });
    case actions.GET_ALL_WARDS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        allWards: payload.wardListing,
        allWardsError: '',
      });
    case actions.GET_ALL_WARDS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        allWards: [],
        allWardsError: payload,
      });
    case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
      return Object.assign({}, state, {
        isLoading: false,
        allZonesError: '',
      });
    case logoutActions.LOGOUT_SUCCESS:
      return Object.assign({}, state, { isLoading: true, allWards: [], allWardsError: '' });
    default:
      return state;
  }
};

export default getAllWardsReducer;
