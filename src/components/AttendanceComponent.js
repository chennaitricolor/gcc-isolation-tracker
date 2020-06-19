import React from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';

const AttendanceComponent = (props) => {
  const { patient, open, handleClose } = props;
  const { Name, Address, Phone } = patient;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent style={{ padding: 0 }}>
        <div style={{ padding: '5%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5">
              <span style={{ fontWeight: 'bold' }}>Patient Info</span>
            </Typography>
            <IconButton onClick={handleClose} style={{ padding: 0 }}>
              <CancelIcon />
            </IconButton>
          </div>
          <Typography variant="h6">
            <span>{Name}</span>
          </Typography>
          <Typography>
            <span>{Address}</span>
          </Typography>
          <Typography>
            <span>{Phone}</span>
          </Typography>
        </div>
        <hr />
        <div style={{ padding: '5%' }}>
          <Typography variant="h5">
            <span style={{ fontWeight: 'bold' }}>Isolation Info</span>
          </Typography>
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            <span>Is the patient available at home?</span>
          </Typography>
          <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
            <Button variant="contained" style={{ marginTop: '2%', background: 'green', borderRadius: '5%', width: '60%' }}>
              YES
            </Button>
            <Button variant="contained" style={{ marginTop: '2%', background: 'white', color: 'red', borderRadius: '5%', width: '60%' }}>
              NO
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceComponent;
