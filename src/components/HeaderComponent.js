import React from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import actions from '../actions/LogoutAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '8%',
    background: '#3C6886',
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    color: 'white',
    fontSize: '24px',
    letterSpacing: '0px',
    opacity: 1,
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
  },
}));

export const HeaderComponent = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogout = () => {
    dispatch({
      type: actions.INITIATE_LOGOUT,
      payload: {},
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        GCC Isolation Module
      </Typography>
      <IconButton aria-label="Logout" color="primary" onClick={handleLogout}>
        <ExitToAppIcon />
      </IconButton>
    </div>
  );
};

export default HeaderComponent;
