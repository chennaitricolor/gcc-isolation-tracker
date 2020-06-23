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
import InputLabel from '@material-ui/core/InputLabel';
import find from 'lodash/find';
import moment from 'moment';

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
  textField: {
    width: '94%',
    marginTop: '10%',

    '& label': {
      color: '#707070 !important',
      fontSize: '24px',
      display: 'contents',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },

    '& input': {
      fontSize: '24px',
    },
  },
  detailsHeader: {
    textAlign: 'center',
    marginTop: '3%',
  },
  genderInput: {
    width: '94%',
    marginTop: '10%',
  },
  genderLegend: {
    fontSize: '24px',
    color: '#707070 !important',
  },
  cancelButton: {
    fontSize: '18px',
    textTransform: 'none',
  },
  submitButton: {
    fontSize: '18px',
    textTransform: 'none',
    marginTop: '5%',
  },
  dropDown: {
    width: '94%',
    marginTop: '10%',

    '& label': {
      color: '#707070 !important',
      fontSize: '24px',
      display: 'contents',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },

    '& input': {
      fontSize: '24px',
    },
  },
  dropDownSelect: {
    fontSize: '24px',
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
  quarantine_sub_type: '',
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

  const renderTextInput = (label, field, handleChange) => {
    return (
      <TextField
        className={styles.textField}
        label={label}
        value={details[field] === undefined ? details._address[field] : details[field]}
        size="medium"
        onChange={(e) => handleChange(field, e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    );
  };

  const renderNumberInput = (label, field, handleChange) => {
    return (
      <TextField
        className={styles.textField}
        label={label}
        value={details[field] === undefined ? details._address[field] : details[field]}
        type="number"
        size="medium"
        onChange={(e) => handleChange(field, e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    );
  };

  const renderGenderInput = (field = 'gender') => {
    return (
      <FormControl component="fieldset" className={styles.genderInput}>
        <FormLabel component="legend" className={styles.genderLegend}>
          Gender / பாலினம்
        </FormLabel>
        <RadioGroup row aria-label="gender" name="gender1" value={details[field]} onChange={(e) => personalInfoOnChange(field, e.target.value)}>
          <FormControlLabel classes={{ label: styles.genderLegend }} value="F" control={<Radio />} label="Female" />
          <FormControlLabel classes={{ label: styles.genderLegend }} value="M" control={<Radio />} label="Male" />
          <FormControlLabel classes={{ label: styles.genderLegend }} value="O" control={<Radio />} label="Others" />
        </RadioGroup>
      </FormControl>
    );
  };

  const renderIsolationDateInput = (field = 'isolation_start_date') => {
    return (
      <TextField
        label="Isolation Start Date"
        type="date"
        size="medium"
        className={styles.textField}
        value={details[field]}
        onChange={(e) => personalInfoOnChange(field, e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ max: moment().format('YYYY-MM-DD'), min: moment().subtract(14, 'day').format('YYYY-MM-DD') }}
      />
    );
  };

  const renderDropdownInput = (label, field, handleChange, list) => {
    return (
      <FormControl className={styles.dropDown}>
        <InputLabel>{label}</InputLabel>
        <Select
          className={styles.dropDownSelect}
          value={details[field] === undefined ? details._address[field] : details[field]}
          onChange={(e) => handleChange(field, e.target.value)}
        >
          {list.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  const quarantineSubTypes = () => find(types, ['id', details.quarantine_type]).quarantine_sub_types;

  const canEnableSubmit = () => {
    const { name, age, gender, phone_number, quarantine_type, quarantine_sub_type, family_member_total, _address } = details;
    const { door_num, building_name, street, area, locality, zone, division } = _address;
    return (
      name &&
      age &&
      gender &&
      phone_number &&
      quarantine_type &&
      (quarantineSubTypes().length === 0 || quarantine_sub_type) &&
      family_member_total &&
      door_num &&
      building_name &&
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
        <Typography variant="h5">Add New Person</Typography>
        <Button variant="contained" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </Button>
      </div>
      <form className={styles.form}>
        <Typography variant="h5" className={styles.detailsHeader}>
          Personal Details
        </Typography>
        {renderTextInput('Person Name / நபர் பெயர்', 'name', personalInfoOnChange)}
        {renderNumberInput('Age / வயது', 'age', personalInfoOnChange)}
        {renderGenderInput()}
        {renderNumberInput('Phone Number / தொலைபேசி எண்', 'phone_number', personalInfoOnChange)}
        {renderIsolationDateInput()}
        {renderDropdownInput('Quarantine Type', 'quarantine_type', personalInfoOnChange, types)}
        {details.quarantine_type &&
          quarantineSubTypes().length > 0 &&
          renderDropdownInput('Quarantine Sub-Type', 'quarantine_sub_type', personalInfoOnChange, quarantineSubTypes())}
        {renderNumberInput('Total Family Members / மொத்த குடும்ப உறுப்பினர்கள்', 'family_member_total', personalInfoOnChange)}
        <Typography variant="h5" className={styles.detailsHeader}>
          Location Details
        </Typography>
        {renderTextInput('Door No / கதவு எண்', 'door_num', addressInfoOnChange)}
        {renderTextInput('Building Name / கட்டிட பெயர்', 'building_name', addressInfoOnChange)}
        {renderTextInput('House No. Old / வீட்டின் எண் பழையது', 'house_num_old', addressInfoOnChange)}
        {renderTextInput('House No. New / வீட்டின் எண் புதியது', 'house_num_new', addressInfoOnChange)}
        {renderTextInput('Street Name / தெரு பெயர்', 'street', addressInfoOnChange)}
        {renderTextInput('Area Name / பகுதி பெயர்', 'area', addressInfoOnChange)}
        {renderTextInput('Locality / வட்டாரம்', 'locality', addressInfoOnChange)}
        {renderDropdownInput('Zone / மண்டலம்', 'zone', addressInfoOnChange, zones)}
        {renderTextInput('Division', 'division', addressInfoOnChange)}
      </form>
      <Button variant="contained" disabled={!canEnableSubmit()} onClick={() => onSubmit(details)} className={styles.submitButton}>
        Submit
      </Button>
    </div>
  );
};

export default AddNewPatientComponent;
