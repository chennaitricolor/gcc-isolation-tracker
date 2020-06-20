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

const useStyles = makeStyles(() => ({
  root: { display: 'flex', flexFlow: 'column', height: '92%', overflowY: 'scroll', padding: '5%' },
  pageTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  form: {
    display: 'flex',
    flexFlow: 'column',
  },
  textField: {
    width: '94%',
    marginTop: '5%',

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
    marginTop: '5%',
  },
  genderLegend: {
    fontSize: '24px',
  },
}));

const AddNewPatientComponent = () => {
  const styles = useStyles();
  const [details, setDetails] = useState({});

  const renderTextInput = (label, field) => {
    return (
      <TextField
        className={styles.textField}
        label={label}
        value={details[field]}
        size="medium"
        onChange={(e) => setDetails({ ...details, [field]: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
    );
  };

  const renderNumberInput = (label, field) => {
    return (
      <TextField
        className={styles.textField}
        label={label}
        value={details[field]}
        type="number"
        size="medium"
        onChange={(e) => setDetails({ ...details, [field]: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
    );
  };

  const renderGenderInput = () => {
    return (
      <FormControl component="fieldset" className={styles.genderInput}>
        <FormLabel component="legend" className={styles.genderLegend}>
          Gender / பாலினம்
        </FormLabel>
        <RadioGroup
          row
          aria-label="gender"
          name="gender1"
          value={details.gender}
          onChange={(e) => setDetails({ ...details, gender: e.target.value })}
        >
          <FormControlLabel classes={{ label: styles.genderLegend }} value="female" control={<Radio />} label="Female" />
          <FormControlLabel classes={{ label: styles.genderLegend }} value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.pageTitle}>
        <Typography variant="h4">Add New Patient</Typography>
        <Button>Cancel</Button>
      </div>
      <form className={styles.form}>
        <Typography variant="h5" className={styles.detailsHeader}>
          Personal Details
        </Typography>
        {renderTextInput('Person Name / நபர் பெயர்', 'name')}
        {renderNumberInput('Age / வயது', 'age')}
        {renderGenderInput()}
        {renderNumberInput('Phone Number / தொலைபேசி எண்', 'number')}
        {renderNumberInput('Total Family Members / மொத்த குடும்ப உறுப்பினர்கள்', 'familyCount')}
        <Typography variant="h5" className={styles.detailsHeader}>
          Location Details
        </Typography>
        {renderTextInput('Door No / கதவு எண்', 'door')}
        {renderTextInput('Building Name / கட்டிட பெயர்', 'building')}
        {renderTextInput('House No. Old / வீட்டின் எண் பழையது', 'oldHouseNo')}
        {renderTextInput('House No. New / வீட்டின் எண் புதியது', 'newHouseNo')}
        {renderTextInput('Street Name / தெரு பெயர்', 'street')}
        {renderTextInput('Area Name / பகுதி பெயர்', 'area')}
        {renderTextInput('Locality / வட்டாரம்', 'locality')}
        {renderTextInput('Zone / மண்டலம்', 'zone')}
        {renderTextInput('Division', 'division')}
      </form>
    </div>
  );
};

export default AddNewPatientComponent;
