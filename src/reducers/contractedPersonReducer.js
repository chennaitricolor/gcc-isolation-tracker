import actions from '../actions/addContractedPersonsAction';
import updateContractedPersonsAction from '../actions/updateContractedPersonsAction';
import toastActions from '../actions/ToastAction';

const defaultState = {
  addContractedPersonMessage: '',
  addContractedPersonError: '',
  isSaving: false,
};

const contractedPersonReducer = (state = defaultState, { type, response }) => {
  switch (type) {
    case actions.ADD_CONTRACTED_PERSONS:
      return Object.assign({}, state, {
        addContractedPersonMessage: '',
        addContractedPersonError: '',
        isSaving: true,
      });
    case actions.ADD_CONTRACTED_PERSONS_SUCCESS:
      return Object.assign({}, state, {
        addContractedPersonMessage: response,
        addContractedPersonError: '',
        isSaving: false,
      });
    case actions.ADD_CONTRACTED_PERSONS_FAILURE:
      return Object.assign({}, state, {
        addContractedPersonError: response,
        isSaving: false,
      });
    case updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS:
      return Object.assign({}, state, {
        addContractedPersonMessage: '',
        addContractedPersonError: '',
        isSaving: true,
      });
    case updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS_SUCCESS:
      return Object.assign({}, state, {
        addContractedPersonMessage: response,
        addContractedPersonError: '',
        isSaving: false,
      });
    case updateContractedPersonsAction.UPDATE_CONTRACTED_PERSONS_FAILURE:
      return Object.assign({}, state, {
        addContractedPersonError: response,
        isSaving: false,
      });
    case toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE:
      return Object.assign({}, state, {
        addContractedPersonMessage: '',
        addContractedPersonError: '',
        isSaving: false,
      });
    default:
      return state;
  }
};

export default contractedPersonReducer;
