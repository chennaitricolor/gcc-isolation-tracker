import actions from '../actions/ResetPasswordAction';

const defaultState = {
    resetPasswordMessage: null,
};

const resetPasswordResponse = (state = defaultState, action) => {
    switch (action.type) {
        case actions.RESET_PASSWORD_SUCCESS:
            return Object.assign({}, state, { resetPasswordMessage: action.response });
        case actions.RESET_PASSWORD_FAILURE:
            return Object.assign({}, state, { resetPasswordMessage: action.response });
        default:
            return state;
    }
};

export default resetPasswordResponse;