import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputMask from 'react-input-mask';
import find from 'lodash/find';
import moment from 'moment';
import RequiredFieldMarker from './RequiredFieldMarker';

const useStyles = makeStyles(() => ({
  root: { display: 'flex', flexFlow: 'column', height: '92%', overflowY: 'scroll', padding: '5%' },
  pageTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexFlow: 'column',
  },
  fieldLabel: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#151522 !important',
  },
  textField: {
    width: '94%',
    marginTop: '3%',
    backgroundColor: '#fff',

    '& label': {
      color: '#707070 !important',
      fontSize: '18PX',
      display: 'contents',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },

    '& input': {
      fontSize: '18px',
      color: '#4F4F4F',
    },
  },
  detailsHeader: {
    textAlign: 'center',
    marginTop: '5%',
    color: '#000000',
  },
  genderInput: {
    width: '94%',
    marginTop: '5%',
  },
  genderLegend: {
    fontSize: '18px',
    color: '#151522 !important',
  },
  cancelButton: {
    fontSize: '18px',
    textTransform: 'none',
  },
  submitButton: {
    fontSize: '18px',
    textTransform: 'none',
    marginTop: '10%',
  },
  dropDown: {
    width: '94%',
    marginTop: '5%',

    '& label': {
      color: '#707070 !important',
      fontSize: '18px',
      display: 'contents',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  dropDownSelect: {
    fontSize: '18px',
    marginTop: '3%',
    backgroundColor: '#fff',

    '& div': {
      fontSize: '18px',
      color: '#4F4F4F',
    },
  },
}));

const initialState = {
  name: '',
  age: '',
  gender: '',
  phone_number: '',
  family_member_total: '',
  isolation_start_date: moment().format('YYYY-MM-DD'),
  quarantine_type: '',
  quarantine_sub_type: null,
  _address: {
    door_num: '',
    building_name: '',
    house_num_old: '',
    house_num_new: '',
    street: '',
    area: '',
    locality: '',
    zone: '',
    division: '',
  },
};

const AddNewPatientComponent = ({ onSubmit, onCancel, zones, types }) => {
  const styles = useStyles();
  const [details, setDetails] = useState(initialState);

  const personalInfoOnChange = (field, value) => setDetails({ ...details, [field]: value });
  const addressInfoOnChange = (field, value) => setDetails({ ...details, _address: { ...details._address, [field]: value } });

  const renderTextInput = (label, field, handleChange, isRequired = false) => {
    return (
      <div style={{ marginTop: '5%' }}>
        <Typography component={'div'} className={styles.fieldLabel}>
          {label}
          {isRequired && <RequiredFieldMarker />}
        </Typography>
        <TextField
          className={styles.textField}
          value={details[field] === undefined ? details._address[field] : details[field]}
          size="small"
          variant={'outlined'}
          onChange={(e) => handleChange(field, e.target.value)}
          InputLabelProps={{ shrink: true }}
          autoComplete={'disabled'}
        />
      </div>
    );
  };

  const renderNumberInput = (label, field, handleChange, lengthAsMask, isRequired = false) => {
    return (
      <div style={{ marginTop: '5%' }}>
        <Typography component={'div'} className={styles.fieldLabel}>
          {label}
          {isRequired && <RequiredFieldMarker />}
        </Typography>
        <InputMask
          mask={lengthAsMask}
          maskChar={null}
          value={details[field] === undefined ? details._address[field] : details[field]}
          onChange={(e) => handleChange(field, e.target.value)}
        >
          {() => <TextField className={styles.textField} size="small" variant={'outlined'} InputLabelProps={{ shrink: true }} />}
        </InputMask>
      </div>
    );
  };

  const renderGenderInput = (field = 'gender') => {
    return (
      <FormControl component="fieldset" className={styles.genderInput}>
        <FormLabel component="legend" className={styles.fieldLabel}>
          Gender / பாலினம்
          <RequiredFieldMarker />
        </FormLabel>
        <RadioGroup
          row
          aria-label="gender"
          name="gender1"
          value={details[field]}
          onChange={(e) => personalInfoOnChange(field, e.target.value)}
          style={{ marginTop: '2%' }}
        >
          <FormControlLabel classes={{ label: styles.genderLegend }} value="M" control={<Radio />} label="Male" />
          <FormControlLabel classes={{ label: styles.genderLegend }} value="F" control={<Radio />} label="Female" />
          <FormControlLabel classes={{ label: styles.genderLegend }} value="O" control={<Radio />} label="Others" />
        </RadioGroup>
      </FormControl>
    );
  };

  const renderIsolationDateInput = (field = 'isolation_start_date') => {
    return (
      <div style={{ marginTop: '5%' }}>
        <Typography component={'div'} className={styles.fieldLabel}>
          {'Isolation Start Date'}
          <RequiredFieldMarker />
        </Typography>
        <TextField
          type="date"
          size="small"
          variant={'outlined'}
          className={styles.textField}
          value={details[field]}
          onChange={(e) => {
            const { value } = e.target;
            if (moment(value).isValid() && moment(value).isBetween(moment().subtract(14, 'day'), moment().add(1, 'day'), 'day')) {
              personalInfoOnChange(field, value);
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
  };

  const renderDropdownInput = (label, field, handleChange, list, isRequired = false) => {
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
          value={details[field] === undefined ? details._address[field] : details[field]}
          onChange={(e) => handleChange(field, e.target.value)}
        >
          {list.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {field === 'zone' ? `${item.id} - ${item.name}` : item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  const quarantineSubTypes = () => find(types, ['id', details.quarantine_type]).quarantine_sub_types;

  const canEnableSubmit = () => {
    const { name, age, gender, phone_number, quarantine_type, quarantine_sub_type, family_member_total, _address, isolation_start_date } = details;
    const { door_num, street, area, locality, zone, division } = _address;
    return (
      name &&
      age &&
      gender &&
      isolation_start_date &&
      phone_number &&
      quarantine_type &&
      (quarantineSubTypes().length === 0 || quarantine_sub_type) &&
      family_member_total &&
      door_num &&
      street &&
      area &&
      locality &&
      zone &&
      division
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.pageTitle}>
        <Typography variant="h5" component={'div'} style={{ color: '#3C6886' }}>
          Add New Person
        </Typography>
        <Button variant="contained" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </Button>
      </div>
      <form className={styles.form}>
        <Typography variant="h5" className={styles.detailsHeader} component={'div'} style={{ color: '#000000' }}>
          Personal Details
        </Typography>
        {renderTextInput('Person Name / நபர் பெயர்', 'name', personalInfoOnChange, true)}
        {renderNumberInput('Age / வயது', 'age', personalInfoOnChange, '999', true)}
        {renderGenderInput()}
        {renderNumberInput('Phone Number / தொலைபேசி எண்', 'phone_number', personalInfoOnChange, '9999999999', true)}
        {renderIsolationDateInput()}
        {renderDropdownInput('Quarantine Type', 'quarantine_type', personalInfoOnChange, types, true)}
        {details.quarantine_type &&
          quarantineSubTypes().length > 0 &&
          renderDropdownInput('Quarantine Sub-Type', 'quarantine_sub_type', personalInfoOnChange, quarantineSubTypes(), true)}
        {renderNumberInput('Total Family Members / மொத்த குடும்ப உறுப்பினர்கள்', 'family_member_total', personalInfoOnChange, '99', true)}
        <Typography variant="h5" className={styles.detailsHeader}>
          Location Details
        </Typography>
        {renderTextInput('Door No / கதவு எண்', 'door_num', addressInfoOnChange, true)}
        {renderTextInput('Building Name / கட்டிட பெயர்', 'building_name', addressInfoOnChange, false)}
        {renderTextInput('House No. Old / வீட்டின் எண் பழையது', 'house_num_old', addressInfoOnChange)}
        {renderTextInput('House No. New / வீட்டின் எண் புதியது', 'house_num_new', addressInfoOnChange)}
        {renderTextInput('Street Name / தெரு பெயர்', 'street', addressInfoOnChange, true)}
        {renderTextInput('Area Name / பகுதி பெயர்', 'area', addressInfoOnChange, true)}
        {renderTextInput('Locality / வட்டாரம்', 'locality', addressInfoOnChange, true)}
        {renderDropdownInput('Zone / மண்டலம்', 'zone', addressInfoOnChange, zones, true)}
        {renderTextInput('Division', 'division', addressInfoOnChange, true)}
      </form>
      <Button variant="contained" disabled={!canEnableSubmit()} onClick={() => onSubmit(details)} className={styles.submitButton}>
        Submit
      </Button>
    </div>
  );
};

export default AddNewPatientComponent;
