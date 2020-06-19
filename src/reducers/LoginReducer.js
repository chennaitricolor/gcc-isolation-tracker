import actions from '../actions/LoginAction';

const defaultState = {
    loginMessage: null,
};

const loginResponse = (state = defaultState, action) => {
    switch (action.type) {
        case actions.LOGIN_SUCCESS:
            return Object.assign({}, state, { loginMessage: action.response });
        case actions.LOGIN_FAILURE:
            return Object.assign({}, state, { loginMessage: action.response });
        default:
            return state;
    }
};

export default loginResponse;
