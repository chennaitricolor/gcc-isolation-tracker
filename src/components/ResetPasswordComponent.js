import React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    errorMessage: {
        textAlign: 'center',
        color: 'red',
    },
    successMessage: {
        textAlign: 'center',
        color: 'green',
    },
    textField: {
        width: '94%',
        margin: '5% 2% 0% 2%',

        '& label': {
            color: '#707070 !important',
        },

        '& fieldset': {
            border: '1px solid #707070 !important',
        },
    },
    actionButton: {
        margin: '5% 0% 10% 2%',
        fontSize: '20px',
        width: '94%',
        bottom: '0',
    },
}));


const ResetPasswordComponent = (props) => {
    const styles = useStyles();
   const { openRestPasswordDialog, handleResetPasswordOKClick  } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return(<Dialog
        fullScreen={fullScreen}
        open={openRestPasswordDialog}
        aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title">{"Reset Temporary Password to Continue"}</DialogTitle>
        {props.resetPasswordResponse !== undefined && props.resetPasswordResponse.resetPasswordMessage !== null && props.resetPasswordResponse.resetPasswordMessage === 'Unauthorized' ?
            (<div style={{textAlign: 'center', color: 'red'}}> Could not reset password</div>)
        :
            (<div />)
        }
        <DialogContent>
            <TextField
                className={styles.textField + ' agent-x-login-password'}
                label={' New Password'}
                id={'newPassword'}
                value={props.resetPwdDetails.newPassword}
                onChange={event => props.handleResetPwdOnChange(event, 'password', 'text')}
                type={props.resetPwdDetails.showNewPassword ? 'text' : 'password'}
                autoComplete="off"
                margin={'normal'}
                variant={'outlined'}
                InputProps={{ endAdornment: ( <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={props.handleResetPasswordShow}
                            onMouseDown={props.handleMouseDownResetPassword}
                        >
                            {props.resetPwdDetails.showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>)}}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleResetPasswordOKClick} color="primary" autoFocus>
                Reset
            </Button>
        </DialogActions>
    </Dialog>)
};

ResetPasswordComponent.propTypes = {
    handleResetPasswordOKClick: PropTypes.func.isRequired,
    openRestPasswordDialog: PropTypes.bool.isRequired,
    resetPwdDetails: PropTypes.any.isRequired,
    handleResetPwdOnChange: PropTypes.func.isRequired,
    handleResetPasswordShow: PropTypes.func.isRequired,
    handleMouseDownResetPassword: PropTypes.func.isRequired,
    resetPasswordResponse: PropTypes.any
}

export default ResetPasswordComponent;