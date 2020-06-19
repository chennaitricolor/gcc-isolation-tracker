import React from 'react';
import * as PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles((theme) => ({
  success: {
    overflow: 'auto',
    backgroundColor: theme.palette.success.main,
  },
  error: {
    overflow: 'auto',
    backgroundColor: theme.palette.error.main,
  },
  info: {
    overflow: 'auto',
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    fontFamily: 'sans-serif',
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classes[variant]}
      aria-describedby="client-snackbar"
      message={
        <pre id="client-snackbar" className={classes.message}>
          <Icon className={`${classes.icon} ${classes.iconVariant}`} />
          {message}
        </pre>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success']).isRequired,
};

export const ToastComponent = (props) => (
  <div style={{ position: 'absolute' }}>
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={props.openToast}
      autoHideDuration={5000}
      onClose={props.handleClose}
      style={{ bottom: '15%', maxWidth: '45%' }}
    >
      <MySnackbarContentWrapper onClose={props.handleClose} variant={props.toastVariant} message={props.toastMessage} />
    </Snackbar>
  </div>
);

ToastComponent.propTypes = {
  toastMessage: PropTypes.string.isRequired,
  openToast: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  toastVariant: PropTypes.string.isRequired,
};

export default ToastComponent;
