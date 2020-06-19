import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  dialogContent: {
    padding: 0,
  },
  patientInfo: {
    padding: '5%',
  },
  patientInfoHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontWeight: 'bold' },
  buttons: { display: 'flex', flexFlow: 'column', alignItems: 'center' },
  presentButton: { marginTop: '2%', background: 'green', borderRadius: '5%', width: '60%' },
  absentButton: { marginTop: '2%', background: 'white', color: 'red', borderRadius: '5%', width: '60%' },
}));

const AttendanceComponent = (props) => {
  const styles = useStyles();
  const { patient, open, handleClose } = props;
  const { Name, Address, Phone } = patient;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent className={styles.dialogContent}>
        <div className={styles.patientInfo}>
          <div className={styles.patientInfoHeader}>
            <Typography variant="h5">
              <span className={styles.title}>Patient Info</span>
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
            <span className={styles.title}>Isolation Info</span>
          </Typography>
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            <span>Is the patient available at home?</span>
          </Typography>
          <div className={styles.buttons}>
            <Button variant="contained" className={styles.presentButton}>
              YES
            </Button>
            <Button variant="contained" className={styles.absentButton}>
              NO
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceComponent;
