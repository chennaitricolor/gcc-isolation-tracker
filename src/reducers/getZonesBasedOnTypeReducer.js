import actions from '../actions/getZonesByTypeAction';
import toastActions from '../actions/ToastAction';
import logoutActions from '../actions/LogoutAction';

const defaultState = {
  allZones: [],
  allZonesError: '',
  isLoading: false,
};

const getZonesBasedOnTypeReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actions.GET_ZONE_BY_TYPE:
      return Object.assign({}, state, {
        isLoading: true,
        allZones: [],
        allZonesError: '',
      });
    case actions.GET_ZONE_BY_TYPE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        allZones: payload.zoneListing,
        allZonesError: '',
      });
    case actions.GET_ZONE_BY_TYPE_FAILURE:
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

export default getZonesBasedOnTypeReducer;
