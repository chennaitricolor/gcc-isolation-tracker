import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import RequiredFieldMarker from './RequiredFieldMarker';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  dialogContent: {
    padding: 0,
  },
  patientInfo: {
    padding: '5%',
    paddingTop: '0%',
    borderBottom: '1px solid #BDBDBD',
  },
  patientInfoHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
  radioButton: {
    color: '#3C6886',
    fontSize: '16px',
    marginTop: '3%',
  },
  textField: {
    margin: '0',
    width: '100%',
    marginTop: '3%',

    '& label': {
      color: '#707070 !important',
      fontSize: '14px',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  '@global': {
    '.attendance-component-dialog > div:nth-child(3) > div:nth-child(1)': {
      height: '100%',
    },
    '.submit-button:hover': {
      backgroundColor: '#3C6886',
    },
  },
}));

function renderRadioButtonField(label, key, value, radioButtonList, handleOnChange, styles, isRequired) {
  return (
    <div className={'attendance-information-' + key}>
      <Typography component={'div'} className={'attendance-information-' + key + '-form-label' + ' ' + styles.radioButton}>
        {label}
        {isRequired && <RequiredFieldMarker />}
      </Typography>
      <RadioGroup style={{ display: 'inline-block' }} value={value} onChange={(event) => handleOnChange(event, key, 'radioButton')}>
        {radioButtonList.map((radioButton, index) => {
          return <FormControlLabel key={index} value={radioButton.value} control={<Radio />} label={radioButton.label} />;
        })}
      </RadioGroup>
    </div>
  );
}

function renderTextField(label, key, value, handleOnChange, styles, isRequired) {
  return (
    <div className={'attendance-information-' + key}>
      <Typography component={'div'} className={'attendance-information-' + key + '-form-label'} style={{ color: '#3C6886', fontSize: '16px' }}>
        {label}
        {isRequired && <RequiredFieldMarker />}
      </Typography>
      <TextField
        className={'attendance-information-' + key + ' ' + styles.textField}
        id={key}
        value={value}
        onChange={(event) => handleOnChange(event, key, 'text')}
        autoComplete={'off'}
        margin={'normal'}
        variant={'outlined'}
      />
    </div>
  );
}

const yesNoRadioButton = [
  { label: 'Yes', value: 'Y' },
  { label: 'No', value: 'N' },
];

const AttendanceComponent = (props) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { patient, open, handleClose } = props;
  const { name, phone_number, address } = patient;

  const [showSave, setShowSave] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState({
    isPersonPresent: '',
    isFamilyMembersPresent: '',
    basicNecessities: '',
    isSymptoms: '',
    comments: '',
  });

  useEffect(() => {
    let showSave = attendanceDetails.isPersonPresent !== '' && attendanceDetails.isFamilyMembersPresent !== '' && attendanceDetails.isSymptoms !== '';
    setShowSave(showSave);
  }, [attendanceDetails]);

  const handleOnChange = (event, id, type) => {
    if (type === 'text') {
      if (event.target.value !== '') {
        setAttendanceDetails({
          ...attendanceDetails,
          [event.target.id]: event.target.value,
        });
      } else {
        setAttendanceDetails({
          ...attendanceDetails,
          [event.target.id]: '',
        });
      }
    }
    if (type === 'radioButton') {
      if (event !== null) {
        setAttendanceDetails({
          ...attendanceDetails,
          [id]: event.target.value,
        });
      }
    }
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_CONTRACTED_PERSONS',
      payload: {
        attendanceDetails: {
          is_present_at_home: attendanceDetails.isPersonPresent,
          is_family_members_at_home: attendanceDetails.isFamilyMembersPresent,
          basic_necessities: attendanceDetails.basicNecessities,
          is_self_or_family_with_symptoms: attendanceDetails.isSymptoms,
          additional_comments: attendanceDetails.comments,
          status_check_date: moment().format('YYYY-MM-DD'),
          person: patient.id,
        },
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'md'}
      className={'attendance-component-dialog'}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
    >
      <DialogContent className={styles.dialogContent}>
        <div className={styles.patientInfo}>
          <div className={styles.patientInfoHeader}>
            <Typography variant="h5" className={styles.title}>
              Person Info
            </Typography>
            <IconButton onClick={handleClose} style={{ padding: 0 }}>
              <CancelIcon />
            </IconButton>
          </div>
          <Typography variant="h6" style={{ color: '#3C6886', marginTOp: '2%' }}>
            {name}
          </Typography>
          <Typography style={{ fontSize: '14px' }}>{address}</Typography>
          <Typography style={{ fontSize: '14px' }}>{phone_number}</Typography>
        </div>
        <div style={{ padding: '5%' }}>
          <Typography variant="h5">
            <span className={styles.title}>Isolation Questions</span>
          </Typography>
          <div style={{ marginTop: '5%' }}>
            {renderRadioButtonField(
              'Is the person available at home?',
              'isPersonPresent',
              attendanceDetails.isPersonPresent,
              yesNoRadioButton,
              handleOnChange,
              styles,
              true,
            )}
          </div>
          <div style={{ marginTop: '5%' }}>
            {renderRadioButtonField(
              'Are the Family members present at home?',
              'isFamilyMembersPresent',
              attendanceDetails.isFamilyMembersPresent,
              yesNoRadioButton,
              handleOnChange,
              styles,
              true,
            )}
          </div>
          <div style={{ marginTop: '5%' }}>
            {renderTextField(
              'Do they need any Basic necessities?',
              'basicNecessities',
              attendanceDetails.basicNecessities,
              handleOnChange,
              styles,
              false,
            )}
          </div>
          <div style={{ marginTop: '5%' }}>
            {renderRadioButtonField(
              'Does the person or any of the family members have symptoms?',
              'isSymptoms',
              attendanceDetails.isSymptoms,
              yesNoRadioButton,
              handleOnChange,
              styles,
              true,
            )}
          </div>
          <div style={{ marginTop: '5%' }}>
            {renderTextField('Additional Comments (optional) ', 'comments', attendanceDetails.comments, handleOnChange, styles, false)}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '2%' }}>
          <Button variant="contained" className={'submit-button'} disabled={!showSave} onClick={handleSave}>
            SUBMIT
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceComponent;
