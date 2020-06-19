import React, { useEffect, useReducer } from 'react';
import { LoginComponent } from '../components/LoginComponent';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions/LoginAction';
import resetPasswordActions from '../actions/ResetPasswordAction';
import ResetPasswordComponent from "../components/ResetPasswordComponent";

export const LoginContainer = () => {

    const [loginDetails, setLoginDetails] = useReducer((state, newState) => ({ ...state, ...newState }), {
        userId: '',
        password: '',
        showPassword: false,
    });

    const [resetPwdDetails, setResetPwdDetails ] = useReducer((state, newState) => ({ ...state, ...newState }), {
        newPassword: '',
        showNewPassword: false,
    });

    const dispatch = useDispatch();
    const getLoginResponse = useSelector(state => state.loginResponse);
    const resetPasswordResponse = useSelector(state => state.resetPasswordResponse);

    useEffect(() => {}, [getLoginResponse]);
    useEffect(() => {}, [resetPasswordResponse]);

    const handleOnChange = (event, id, type) => {
        if (type === 'text') {
            setLoginDetails({
                [event.target.id]: event.target.value,
            });
        }
    };

    const handleResetPwdOnChange = (event, id, type) => {
        if (type === 'text') {
            setResetPwdDetails({
                [event.target.id]: event.target.value,
            });
        }
    };

    const handleClickShowPassword = () => {
        setLoginDetails({ showPassword: !loginDetails.showPassword });
    };

    const handleResetPasswordShow = () => {
        setResetPwdDetails({showNewPassword: !resetPwdDetails.showNewPassword});
    }

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleMouseDownResetPassword = event => {
        event.preventDefault();
    };

    const handleLogin = () => {
        dispatch({
            type: actions.INITIATE_LOGIN,
            payload: {
                username: loginDetails.userId,
                password: loginDetails.password,
            },
        });
    };

    const handleResetPasswordOKClick = () => {
        dispatch({
            type: resetPasswordActions.RESET_PASSWORD,
            payload: {
                password: resetPwdDetails.newPassword,
            },
        });
    }

    const openRestPasswordDialog = (message) => {
        return getLoginResponse.loginMessage && getLoginResponse.loginMessage.isTempUser ? true : false;
    }

    return (
        <div>
            <LoginComponent
                loginDetails={loginDetails}
                handleOnChange={handleOnChange}
                handleLogin={handleLogin}
                getLoginResponse={getLoginResponse}
                handleClickShowPassword={handleClickShowPassword}
                handleMouseDownPassword={handleMouseDownPassword}
            />
            <ResetPasswordComponent openRestPasswordDialog={openRestPasswordDialog()} handleResetPasswordOKClick={handleResetPasswordOKClick} resetPwdDetails={resetPwdDetails}
                                    handleResetPwdOnChange={handleResetPwdOnChange} handleResetPasswordShow={handleResetPasswordShow}
                                    handleMouseDownResetPassword={handleMouseDownResetPassword}
            resetPasswordResponse={resetPasswordResponse}/>
        </div>
    );
};

export default LoginContainer;
