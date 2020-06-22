import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import range from 'lodash/range';
import map from 'lodash/map';
import join from 'lodash/join';
import AttendanceComponent from './AttendanceComponent';

const useStyles = makeStyles(() => ({
  root: { height: '100%', overflow: 'scroll' },
  pageTitle: { padding: '5% 5% 0', display: 'flex' },
  chip: { width: '10%', margin: '-2% 0 0 2%' },
  pendingPatients: { padding: '5%', borderBottom: '1px solid', display: 'flex', flexFlow: 'column' },
  genderAge: { fontSize: '16px' },
  patientCard: { border: '1px solid', padding: '1%', display: 'flex', flexFlow: 'column' },
  sectionTitle: {display:'flex'}
}));

const PatientsComponent = ({ patients }) => {
  const [openPatient, setOpenPatient] = useState(null);
  const styles = useStyles();

  const AttendanceMarker = ({ marked }) => {
    return <span style={{ background: marked ? 'green' : '#BDBDBD', borderRadius: '50%', display: 'inline-block', height: '3vh', width: '3vh' }} />;
  };

  const PatientCards = ({ details, onSelect }) => {
    return details.map((detail) => {
      const { id, name, phone_number, age, gender, _address } = detail;
      const { door_num, house_num_new, building_name, street, area, locality, division } = _address;
      const address = join([door_num, house_num_new, building_name, street, area, locality, division]);
      return (
        <div key={id} className={styles.patientCard} onClick={() => onSelect(detail)}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4">
              {name} <span className={styles.genderAge}>{`${gender}${age}`}</span>
            </Typography>
            {/* <Chip label={`Day ${currentDate}`} color="secondary" /> */}
          </div>
          <Typography> {address} </Typography>
          <Typography>{phone_number}</Typography>
          {/* <div style={{ display: 'flex' }}>
            {map(range(13), (index) => (
              <AttendanceMarker marked={currentDate > index + 1} />
            ))}
          </div> */}
        </div>
      );
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.pageTitle}>
        <Typography variant="h5">Patients</Typography>
        <Chip size="small" label={patients.length} color="secondary" className={styles.chip} />
      </div>
      {patients.length === 0 && (
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>No tasks available</Typography>
        </div>
      )}
      {patients.length > 0 && (
        <>
          <div className={styles.pendingPatients}>
            <div className={styles.sectionTitle}>
              <Typography variant="h5">Pending</Typography>
              <Chip size="small" label="0" style={{ background: '#F2994A', width: '10%', margin: '-2% 0 0 2%' }} />
            </div>
              <PatientCards details={patients} onSelect={(patient) => setOpenPatient(patient)} />
          </div>
          {/* <div style={{ padding: '5%' }}>
            <Typography variant="h5">
              Completed
              <Chip size="small" label="0" style={{ background: 'green', width: '10%', margin: '-2% 0 0 2%' }} />
            </Typography>
            <PatientCards details={pendingPatients} />
          </div> */}
        </>
      )}
      {openPatient && <AttendanceComponent open={openPatient !== null} handleClose={() => setOpenPatient(null)} patient={openPatient} />}
    </div>
  );
};

export default PatientsComponent;
