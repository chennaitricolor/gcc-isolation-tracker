import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import DuplicateIcon from '@material-ui/icons/FileCopyOutlined';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import without from 'lodash/without';
import find from 'lodash/find';
import InputMask from 'react-input-mask';
import actions from '../actions/updateContractedPersonsAction';
import RequiredFieldMarker from './RequiredFieldMarker';
import moment from 'moment';

import { symptoms, necessities, closeReasons } from '../utils/constants';

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
      width: '100%',
    },
    '.submit-button:hover': {
      backgroundColor: '#3C6886',
    },
  },
  confirmScreen: {
    display: 'flex',
    flexFlow: 'column',
    padding: '5%',
  },
  confirmButton: {
    margin: '5%',
    background: 'green',
  },
  rejectButton: {
    margin: '5%',
    background: 'grey',
  },
  closeButton: {
    padding: 0,
    margin: 0,
    color: 'orange',
  },
  deleteButton: {
    padding: 0,
    margin: 0,
    color: 'red',
  },
  duplicateButton: {
    padding: 0,
    margin: 0,
    color: '#3C6886',
  },
  dropDown: {
    marginTop: '5%',

    '& label': {
      color: '#707070 !important',
      fontSize: '14px',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  dropDownSelect: {
    marginTop: '3%',
    backgroundColor: '#fff',

    '& div': {
      color: '#4F4F4F',
    },
  },
  controlButtons: {
    display: 'flex',
    justifyContent: 'space-between',
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

function renderMultiInput(label, key, value, handleOnChange, list, styles, isRequired = false) {
  return (
    <FormControl className={styles.dropDown}>
      <Typography component={'div'} className={styles.fieldLabel}>
        {label}
        {isRequired && <RequiredFieldMarker />}
      </Typography>
      {list.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={value.includes(item)}
              disabled={item !== 'None' && value.includes('None')}
              onChange={(event) => handleOnChange(event, key, 'checkbox')}
              name={item}
            />
          }
          label={item}
        />
      ))}
    </FormControl>
  );
}

function renderDropdownInput(label, key, value, handleOnChange, list, styles, isRequired = false) {
  return (
    <FormControl className={styles.dropDown}>
      <Typography component={'div'} className={styles.fieldLabel}>
        {label}
        {isRequired && <RequiredFieldMarker />}
      </Typography>
      <Select
        variant={'outlined'}
        size={'small'}
        className={styles.dropDownSelect}
        value={value}
        onChange={(e) => handleOnChange(key, e.target.value)}
      >
        {list.map((item) => {
          return typeof item === 'string' ? (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ) : (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

function renderDateInput(label, key, value, onChange, styles, isRequired = false) {
  return (
    <div style={{ marginTop: '5%' }}>
      <Typography component={'div'} className={styles.fieldLabel}>
        {label}
        {isRequired && <RequiredFieldMarker />}
      </Typography>
      <TextField
        type="date"
        size="small"
        variant={'outlined'}
        className={styles.textField}
        value={value}
        onChange={(e) => {
          const { value } = e.target;
          if (moment(value).isValid() && moment(value).isBetween(moment().subtract(14, 'day'), moment().add(1, 'day'), 'day')) {
            onChange(key, value);
          }
        }}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          max: moment().format('YYYY-MM-DD'),
          min: moment().subtract(13, 'day').format('YYYY-MM-DD'),
        }}
      />
    </div>
  );
}

function renderNumberInput(label, field, value, handleChange, lengthAsMask, styles, isRequired = false) {
  return (
    <div style={{ marginTop: '5%' }}>
      <Typography component={'div'} className={styles.fieldLabel}>
        {label}
        {isRequired && <RequiredFieldMarker />}
      </Typography>
      <InputMask mask={lengthAsMask} maskChar={null} value={value} onChange={(e) => handleChange(field, e.target.value)}>
        {() => <TextField className={styles.textField} size="small" variant={'outlined'} InputLabelProps={{ shrink: true }} />}
      </InputMask>
    </div>
  );
}
const yesNoRadioButton = [
  { label: 'Yes', value: 'Y' },
  { label: 'No', value: 'N' },
];

const initialDuplicateDetails = {
  quarantine_start_date: '',
  quarantine_type: '',
  quarantine_sub_type: null,
  no_of_duplicates: '',
};

const AttendanceComponent = (props) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { patient, open, handleClose, contractedPersonResponse, types } = props;
  const { id, name, phone_number, address, quarantine_type, isolation_end_date, visitsMadeToday } = patient;
  const _quarantine_type = find(types, ['id', quarantine_type]);

  const [showSave, setShowSave] = useState(false);
  const [closeCase, setCloseCase] = useState(false);
  const [deleteCase, setDeleteCase] = useState(false);
  const [isLastEnquiry, setIsLastEnquiry] = useState(false);
  const [closeReason, setCloseReason] = useState('');
  const [manualReason, setManualReason] = useState('');
  const [duplicateCase, setDuplicateCase] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState({
    isPersonPresent: '',
    personSp02Level: '',
    isFamilyMembersPresent: '',
    basicNecessities: [],
    symptoms: [],
    comments: '',
  });

  const [duplicateDetails, setDuplicateDetails] = useState(initialDuplicateDetails);

  useEffect(() => {
    let showSave = attendanceDetails.isPersonPresent !== '' && attendanceDetails.symptoms.length && attendanceDetails.isFamilyMembersPresent !== '';
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
    if (type === 'checkbox') {
      if (event !== null) {
        if (event.target.name === 'None') {
          setAttendanceDetails({
            ...attendanceDetails,
            [id]: event.target.checked ? ['None'] : [],
          });
        } else if (!attendanceDetails[id].includes(event.target.name)) {
          setAttendanceDetails({
            ...attendanceDetails,
            [id]: [...attendanceDetails[id], event.target.name],
          });
        } else {
          const updatedList = without(attendanceDetails[id], event.target.name);
          setAttendanceDetails({
            ...attendanceDetails,
            [id]: updatedList,
          });
        }
      }
    }
  };

  const handleSave = () => {
    if (!isLastEnquiry && isolation_end_date === moment().format('YYYY-MM-DD') && visitsMadeToday === 1) {
      setIsLastEnquiry(true);
    } else {
      const payload = {
        attendanceDetails: {
          is_present_at_home: attendanceDetails.isPersonPresent,
          is_family_members_at_home: attendanceDetails.isFamilyMembersPresent === '' ? null : attendanceDetails.isFamilyMembersPresent,
          basic_necessities_delivered: attendanceDetails.basicNecessities,
          self_or_family_with_symptoms: attendanceDetails.symptoms,
          additional_comments: attendanceDetails.comments,
          spo2: attendanceDetails.personSp02Level,
          status_check_date: moment().format('YYYY-MM-DD'),
          person: patient.id,
          day: patient.currentDay,
        },
      };
      dispatch({
        type: 'UPDATE_CONTRACTED_PERSONS',
        payload,
      });
      if (isLastEnquiry) {
        dispatch({
          type: actions.CLOSE_CONTRACTED_PERSON,
          payload: { id, reason: null },
        });
      }
    }
  };

  const canEnableConfirm = () => {
    if (closeCase) {
      return closeReason && (closeReason !== 'Others' || manualReason);
    }
    if (deleteCase) {
      return manualReason;
    }
    if (duplicateCase) {
      const { quarantine_start_date, quarantine_type, quarantine_sub_type, no_of_duplicates } = duplicateDetails;
      return quarantine_start_date && quarantine_type && no_of_duplicates && (quarantineSubTypes().length === 0 || quarantine_sub_type);
    }
    return true;
  };

  const handleConfirmation = () => {
    if (closeCase) {
      const reason = closeReason === 'Others' ? manualReason : closeReason;
      dispatch({
        type: actions.CLOSE_CONTRACTED_PERSON,
        payload: { id, reason },
      });
    } else if (deleteCase) {
      dispatch({
        type: actions.DELETE_CONTRACTED_PERSON,
        payload: { id, reason: manualReason },
      });
    } else {
      dispatch({
        type: actions.DUPLICATE_CONTRACTED_PERSON,
        payload: { id, details: { ...duplicateDetails, person: id } },
      });
      setDuplicateCase(false);
      setDuplicateDetails(initialDuplicateDetails);
    }
  };

  const handleDuplicateDetailsChange = (key, value) => {
    setDuplicateDetails({ ...duplicateDetails, [key]: value });
  };

  const quarantineSubTypes = () => find(types, ['id', duplicateDetails.quarantine_type]).quarantine_sub_types;

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
          <Typography style={{ fontSize: '14px' }}>Quarantine Type: {_quarantine_type.name}</Typography>
          {!closeCase && !deleteCase && !duplicateCase && (
            <div className={styles.controlButtons}>
              <Button onClick={() => setCloseCase(true)} className={styles.closeButton}>
                <CloseIcon />
                Close
              </Button>
              <Button onClick={() => setDeleteCase(true)} className={styles.deleteButton}>
                <DeleteIcon />
                Delete
              </Button>
              <Button onClick={() => setDuplicateCase(true)} className={styles.duplicateButton}>
                <DuplicateIcon />
                Duplicate
              </Button>
            </div>
          )}
        </div>
        {!closeCase && !deleteCase && !duplicateCase && visitsMadeToday < 2 && !isLastEnquiry && (
          <>
            <div style={{ padding: '5%' }}>
              <Typography variant="h5">
                <span className={styles.title}>Quarantine Questions</span>
              </Typography>
              <div style={{ marginTop: '5%' }}>
                {renderRadioButtonField(
                  _quarantine_type.code === 'PPH'
                    ? 'Is the person available at home / hospital / covid care center?'
                    : 'Is the person available at home?',
                  'isPersonPresent',
                  attendanceDetails.isPersonPresent,
                  yesNoRadioButton,
                  handleOnChange,
                  styles,
                  true,
                )}
              </div>
              <div style={{ marginTop: '5%' }}>
              {renderNumberInput(
              'SpO₂ level of person?',
              'personSp02Level',
              attendanceDetails.personSp02Level,
              (field, value) => setAttendanceDetails({
                ...attendanceDetails,
                personSp02Level: value,
              }),
              '999',
              styles,
              false,
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
                {renderMultiInput(
                  'Which of the following the basic necessities delivered?',
                  'basicNecessities',
                  attendanceDetails.basicNecessities,
                  handleOnChange,
                  necessities,
                  styles,
                  false,
                )}
              </div>
              <div style={{ marginTop: '5%' }}>
                {renderMultiInput(
                  'Does the person or any of the family members have symptoms?',
                  'symptoms',
                  attendanceDetails.symptoms,
                  handleOnChange,
                  symptoms,
                  styles,
                  true,
                )}
              </div>
              <div style={{ marginTop: '5%' }}>
                {renderTextField('Additional Comments (optional) ', 'comments', attendanceDetails.comments, handleOnChange, styles, false)}
              </div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '2%' }}>
              <Button variant="contained" className={'submit-button'} disabled={!showSave || contractedPersonResponse.isSaving} onClick={handleSave}>
                SUBMIT
              </Button>
            </div>
          </>
        )}
        {(closeCase || deleteCase) && (
          <div className={styles.confirmScreen}>
            <Typography>{`Confirm if you want to ${closeCase ? 'close' : 'delete'} the case`}</Typography>
            {closeCase &&
              renderDropdownInput('Close Reason', 'closeReason', closeReason, (key, value) => setCloseReason(value), closeReasons, styles, true)}
            {(closeReason === 'Others' || deleteCase) &&
              renderTextField('Enter reason', 'manualReason', manualReason, (event) => setManualReason(event.target.value), styles, true)}
            <Button variant="contained" className={styles.confirmButton} onClick={handleConfirmation} disabled={!canEnableConfirm()}>
              Yes
            </Button>
            <Button
              variant="contained"
              className={styles.rejectButton}
              onClick={() => {
                setCloseCase(false);
                setDeleteCase(false);
              }}
            >
              No
            </Button>
          </div>
        )}
        {isLastEnquiry && (
          <div className={styles.confirmScreen}>
            <Typography>Confirm if we can close the case as this is last enquiry for the person.</Typography>
            <Button variant="contained" className={styles.confirmButton} onClick={handleSave}>
              Yes
            </Button>
          </div>
        )}
        {duplicateCase && (
          <div className={styles.confirmScreen}>
            {renderDateInput(
              'Quarantine Start Date',
              'quarantine_start_date',
              duplicateDetails.quarantine_start_date,
              handleDuplicateDetailsChange,
              styles,
              true,
            )}
            {renderDropdownInput(
              'Quarantine Type',
              'quarantine_type',
              duplicateDetails.quarantine_type,
              handleDuplicateDetailsChange,
              types,
              styles,
              true,
            )}
            {duplicateDetails.quarantine_type &&
              quarantineSubTypes().length > 0 &&
              renderDropdownInput(
                'Quarantine Sub-Type',
                'quarantine_sub_type',
                duplicateDetails.quarantine_sub_type,
                handleDuplicateDetailsChange,
                quarantineSubTypes(),
                styles,
                true,
              )}
            {renderNumberInput(
              'No. Of Duplicates',
              'no_of_duplicates',
              duplicateDetails.no_of_duplicates,
              handleDuplicateDetailsChange,
              '99',
              styles,
              true,
            )}
            <Button variant="contained" className={styles.confirmButton} onClick={handleConfirmation} disabled={!canEnableConfirm()}>
              Submit
            </Button>
            <Button variant="contained" className={styles.rejectButton} onClick={() => setDuplicateCase(false)}>
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceComponent;
