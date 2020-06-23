import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import map from 'lodash/map';
import join from 'lodash/join';
import find from 'lodash/find';
import AttendanceComponent from './AttendanceComponent';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    overflow: 'scroll',
  },
  pageTitle: {
    padding: '5% 5% 0',
    display: 'flex',
  },
  personCountChip: {
    width: '10%',
    margin: '1% 0 0 5%',
    background: '#3C6886',
    color: '#fff',
  },
  pendingCountChip: {
    width: '10%',
    margin: '0 0 0 5%',
    background: '#F2994A',
    color: '#fff',
  },
  pendingPatients: {
    padding: '5%',
    borderBottom: '1px solid #BDBDBD',
    display: 'flex',
    flexFlow: 'column',
  },
  genderAge: {
    fontSize: '16px',
  },
  patientCard: {
    marginTop: '5%',
    border: '1px solid #E0E0E0',
    boxSizing: 'border-box',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    padding: '3%',
  },
  sectionTitle: {
    display: 'flex',
  },
  personName: {
    color: '#3C6886',
    fontSize: '24px',
  },
  personAddress: {
    marginTop: '2%',
    color: '#4F4F4F',
    fontSize: '14px',
  },
  personPhoneNumber: {
    marginTop: '2%',
    color: '#4F4F4F',
    fontSize: '14px',
  },
}));

const PatientsComponent = ({ patients, zones }) => {
  const [openPatient, setOpenPatient] = useState(null);
  const styles = useStyles();

  const AttendanceMarker = ({ marked }) => {
    return <span style={{ background: marked ? 'green' : '#BDBDBD', borderRadius: '50%', display: 'inline-block', height: '3vh', width: '3vh' }} />;
  };

  const PatientCards = ({ details, onSelect }) => {
    return details.map((detail) => {
      const { id, name, phone_number, age, gender, _address } = detail;
      const { door_num, house_num_new, building_name, street, area, locality, division, zone } = _address;
      const zoneName = find(zones, ['id', zone]).name;
      const address = join([door_num, house_num_new, building_name, street, area, locality, zoneName, division], ', ');
      return (
        <div key={id} className={styles.patientCard} onClick={() => onSelect({...detail, address})}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" className={styles.personName} component={'div'}>
              {name} <span className={styles.genderAge}>{`${gender}${age}`}</span>
            </Typography>
            {/*<Chip label={`Day ${currentDate}`} color="secondary" /> */}
          </div>
          <Typography component={'div'} className={styles.personAddress}>
            {address}
          </Typography>
          <Typography component={'div'} className={styles.personPhoneNumber}>
            {phone_number}
          </Typography>
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
        <Typography component={'div'} variant="h5" style={{ color: '#333333', fontWeight: 'bold', fontSize: '22px' }}>
          Persons
        </Typography>
        <Chip component={'div'} size="small" label={patients.length} color="secondary" className={styles.personCountChip} />
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
              <Typography component={'div'} variant="h5" style={{ color: '#333333', fontWeight: 'bold', fontSize: '20px' }}>
                Pending
              </Typography>
              <Chip size="small" label="0" className={styles.pendingCountChip} component={'div'} />
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
