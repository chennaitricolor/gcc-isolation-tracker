import actions from '../actions/GetQuarantineTypesAction';
import toastActions from '../actions/ToastAction';

const defaultState = {
    types: [],
    typesError: '',
    isLoading: false,
};

const getQuarantineTypesReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case actions.GET_QUARANTINE_TYPE:
            return Object.assign({}, state, {
                isLoading: true,
                types: [],
            });
        case actions.GET_QUARANTINE_TYPES_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                types: payload,
            });
        case actions.GET_QUARANTINE_TYPES_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                typesError: payload,
            });
        case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
            return Object.assign({}, state, {
                isLoading: false,
                typesError: '',
            });
        default:
            return state;
    }
};

export default getQuarantineTypesReducer;
