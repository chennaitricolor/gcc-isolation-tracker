import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '8%',
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    color: 'white',
    fontSize: '24px',
    letterSpacing: '0px',
    opacity: 1,
    background: '#3C6886',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
  },
}));

export const HeaderComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        GCC Isolation Module
      </Typography>
      <IconButton aria-label="Logout" color="primary">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default HeaderComponent;
