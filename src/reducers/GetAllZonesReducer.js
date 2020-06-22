import actions from '../actions/GetZonesAction';
import toastActions from '../actions/ToastAction';

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
                allZones: payload,
            });
        case actions.GET_ALL_ZONES_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                allZones: payload,
            });
        case actions.GET_ALL_ZONES_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                allZonesError: payload,
            });
        case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
            return Object.assign({}, state, {
                isLoading: false,
                allZonesError: '',
            });
        default:
            return state;
    }
};

export default getAllZonesReducer;
