import actions from '../actions/GetZonesAction';
import toastActions from '../actions/ToastAction';
import logoutActions from '../actions/LogoutAction';

const defaultState = {
  allZones: [],
  allZonesError: '',
  isLoading: false,
};

const getAllZonesReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.GET_ALL_ZONE:
      return Object.assign({}, state, {
        isLoading: true,
        allZones: [],
        allZonesError: '',
      });
    case actions.GET_ALL_ZONES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        allZones: payload.zoneListing,
        allZonesError: '',
      });
    case actions.GET_ALL_ZONES_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        allZones: [],
        allZonesError: payload,
      });
    case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
      return Object.assign({}, state, {
        isLoading: false,
        allZonesError: '',
      });
    case logoutActions.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        allZones: [],
        allZonesError: '',
      });
    default:
      return state;
  }
};

export default getAllZonesReducer;
