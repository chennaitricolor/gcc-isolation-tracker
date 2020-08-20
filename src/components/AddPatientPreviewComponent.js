import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import join from 'lodash/join';
import filter from 'lodash/filter';
import find from 'lodash/find';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  title: {
    display: 'inline-block',
    fontWeight: 'bold',
    color: '#000000',
  },
  fieldLabel: {
    color: '#151522',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  fieldValue: {
    color: '#4F4F4F',
    fontSize: '14px',
  },
  editButton: {
    marginRight: '5%',
  },
  '@global': {
    '.attendance-component-dialog > div:nth-child(3) > div:nth-child(1)': {
      width: '90%',
    },
  },
}));

function renderReadOnlyData(label, value, styles) {
  return (
    <Grid container alignItems={'center'} spacing={3} direction="row" style={{ marginTop: '2%' }} component={'div'}>
      <Grid item xs={4} className={styles.fieldLabel}>
        {label}
      </Grid>
      <Grid item xs={8} className={styles.fieldValue}>
        {value}
      </Grid>
    </Grid>
  );
}

const AddPatientPreviewComponent = (props) => {
  const styles = useStyles();

  const getZonesBasedOnType = useSelector((state) => state.getZonesBasedOnTypeReducer);

  const { door_num, building_name, house_num_old, house_num_new, street, area, locality, zone, division } = props.previewData._address;
  const zoneName = find(getZonesBasedOnType.allZones, ['id', zone]).name;
  const address = join(
    filter([door_num, house_num_new, house_num_old, building_name, street, area, locality, zoneName, division], (item) => item),
    ', ',
  );
  const quarantineTypeName = find(props.getQuarantineTypes, ['id', props.previewData.quarantine_type]).name;
  const quarantineSubTypeList = find(props.getQuarantineTypes, ['id', props.previewData.quarantine_type]).quarantine_sub_types;
  const quarantineSubTypeName =
    props.previewData.quarantine_sub_type === null ? '' : ' - ' + find(quarantineSubTypeList, ['id', props.previewData.quarantine_sub_type]).name;

  return (
    <Dialog
      open={props.showPreview}
      onClose={props.handleCloseForPreview}
      maxWidth={'lg'}
      className={'attendance-component-dialog'}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
    >
      <DialogTitle style={{ padding: 0 }}>
        <div style={{ padding: '12px 0 8px 16px', width: '100%' }}>
          <Typography variant={'subtitle1'} component={'div'} className={styles.title}>
            PREVIEW PERSON DETAILS
          </Typography>
          <IconButton onClick={props.handleCloseForPreview} style={{ float: 'right', paddingTop: '5px' }}>
            <CancelIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        {renderReadOnlyData('Name', props.previewData.name, styles)}
        {renderReadOnlyData('Gender/Age', props.previewData.gender + '/' + props.previewData.age, styles)}
        {renderReadOnlyData('Phone Number', props.previewData.phone_number, styles)}
        {renderReadOnlyData('Quarantine Start Date', props.previewData.isolation_start_date, styles)}
        {renderReadOnlyData('Quarantine Type', quarantineTypeName + quarantineSubTypeName, styles)}
        {renderReadOnlyData('Total Family Members', props.previewData.family_member_total, styles)}
        {renderReadOnlyData('Address', address, styles)}
      </DialogContent>
      <div style={{ textAlign: 'center', margin: '5%' }}>
        <Button variant={'contained'} className={styles.editButton} onClick={props.handleCloseForPreview}>
          EDIT
        </Button>
        <Button variant="contained" className={styles.submitButton} onClick={() => props.handleSave(props.previewData)}>
          SUBMIT
        </Button>
      </div>
    </Dialog>
  );
};

AddPatientPreviewComponent.propTypes = {
  showPreview: PropTypes.bool,
  handleCloseForPreview: PropTypes.func,
  getQuarantineTypes: PropTypes.array,
  previewData: PropTypes.object,
  handleSave: PropTypes.func,
};

export default AddPatientPreviewComponent;
