import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import join from 'lodash/join';
import find from 'lodash/find';
import filter from 'lodash/filter';
import map from 'lodash/map';
import range from 'lodash/range';
import moment from 'moment';
import AttendanceComponent from './AttendanceComponent';
import ToastComponent from './ToastComponent';
import toastActions from '../actions/ToastAction';

const markerStyle = (isolation_details, currentDay, index) => {
  if (!isolation_details && currentDay === index + 1) return 'pendingMarker';
  if (!isolation_details && currentDay < index + 1) return 'futureMarker';
  if (!isolation_details || isolation_details.is_offline_enquiry) return 'NaMarker';
  if (isolation_details.is_present_at_home) return 'safeMarker';
  if (!isolation_details.is_present_at_home) return 'violatedMarker';
};

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
    width: '14%',
    margin: '1% 0 0 5%',
    background: '#3C6886',
    color: '#fff',
  },
  pendingCountChip: {
    width: '14%',
    margin: '0 0 0 5%',
    background: '#F2994A',
    color: '#fff',
  },
  successCountChip: {
    width: '14%',
    margin: '0 0 0 5%',
    background: '#219653',
    color: '#fff',
  },
  dayCountChip: {
    width: '20%',
    margin: '1% 0 0 5%',
    background: '#3C6886',
    color: '#fff',
  },
  pendingPatients: {
    padding: '5%',
    paddingBottom: '8%',
    borderBottom: '1px solid #BDBDBD',
    display: 'flex',
    flexFlow: 'column',
  },
  completedPatients: {
    padding: '5%',
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
    backgroundColor: '#fff',
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
  attendance: {
    marginTop: '3%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
  },
  markerCaption: {
    color: '#3C6886',
  },
  markerStyle: {
    borderRadius: '50%',
    display: 'inline-block',
    height: '3vh',
    width: '3vh',
    margin: '1px',
  },
  markers: {
    display: 'flex',
  },
  safeMarker: {
    background: 'green',
  },
  violatedMarker: {
    background: 'red',
  },
  pendingMarker: {
    background: '#BDBDBD',
  },
  NaMarker: {
    background: '#4F4F4F',
  },
  futureMarker: {
    background: 'white',
    border: '1px solid',
  },
}));

const PatientsComponent = ({ patients, zones }) => {
  const dispatch = useDispatch();
  const [openPatient, setOpenPatient] = useState(null);
  const contractedPersonResponse = useSelector((state) => state.contractedPersonReducer);

  const styles = useStyles();

  const AttendanceMarker = ({ style }) => {
    return <span className={`${styles.markerStyle} ${styles[style]}`} />;
  };

  const PatientCards = ({ details, onSelect }) => {
    return details.map((detail) => {
      const { id, name, phone_number, age, gender, _address, isolation_start_date, isolation_end_date, _isolation_enquiries } = detail;
      const { door_num, house_num_new, house_num_old, building_name, street, area, locality, division, zone } = _address;
      const zoneName = find(zones, ['id', zone]).name;
      const address = join(
        filter([door_num, house_num_new, house_num_old, building_name, street, area, locality, zoneName, division], (item) => item),
        ', ',
      );
      const currentDay = moment.utc().diff(moment.utc(isolation_start_date), 'days') + 1;
      const totalIsolationDays = moment.utc(isolation_end_date).startOf('day').diff(moment.utc(isolation_start_date).startOf('day'), 'days') + 1;
      const visitsMadeToday = filter(_isolation_enquiries, { day: currentDay }).length;
      return (
        <div key={id} className={styles.patientCard} onClick={() => onSelect({ ...detail, address, currentDay, visitsMadeToday })}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" className={styles.personName} component={'div'}>
              {name} <span className={styles.genderAge}>{`${gender}${age}`}</span>
            </Typography>
            <Chip size="small" label={`Day ${currentDay}`} className={styles.dayCountChip} component={'div'} />
          </div>
          <Typography component={'div'} className={styles.personAddress}>
            {address}
          </Typography>
          <Typography component={'div'} className={styles.personPhoneNumber}>
            {phone_number}
          </Typography>
          <div className={styles.attendance}>
            <Typography component={'div'} className={styles.markerCaption}>
              Person History - Morning
            </Typography>
            <div className={styles.markers}>
              {map(range(totalIsolationDays), (index) => {
                const isolation_details = find(_isolation_enquiries, { day: index + 1, enquiry_seq: 1 });
                return <AttendanceMarker key={index} style={markerStyle(isolation_details, currentDay, index)} />;
              })}
            </div>
            <Typography component={'div'} className={styles.markerCaption}>
              Person History - Evening
            </Typography>
            <div className={styles.markers}>
              {map(range(totalIsolationDays), (index) => {
                const isolation_details = find(_isolation_enquiries, { day: index + 1, enquiry_seq: 2 });
                return <AttendanceMarker key={index} style={markerStyle(isolation_details, currentDay, index)} />;
              })}
            </div>
          </div>
        </div>
      );
    });
  };

  const handleToastClose = () => {
    dispatch({
      type: toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE,
    });
  };

  const pendingPatients = filter(
    patients,
    (patient) =>
      moment.utc().startOf('day').diff(moment.utc(patient.isolation_end_date).startOf('day'), 'days') <= 0 &&
      !(filter(patient._isolation_enquiries, ['status_check_date', moment.utc().format('YYYY-MM-DD')]).length === 2),
  );
  const completedPatients = filter(
    patients,
    (patient) =>
      moment.utc().startOf('day').diff(moment.utc(patient.isolation_end_date).startOf('day'), 'days') <= 0 &&
      filter(patient._isolation_enquiries, ['status_check_date', moment.utc().format('YYYY-MM-DD')]).length === 2,
  );

  const totalPatientsLength = pendingPatients.length + completedPatients.length;

  if (contractedPersonResponse.addContractedPersonMessage !== '' && contractedPersonResponse.addContractedPersonMessage !== undefined) {
    return (
      <ToastComponent
        toastMessage={contractedPersonResponse.addContractedPersonMessage}
        openToast={contractedPersonResponse.addContractedPersonMessage !== ''}
        handleClose={handleToastClose}
        toastVariant={'success'}
      />
    );
  } else {
    return (
      <div className={styles.root}>
        <div className={styles.pageTitle}>
          <Typography component={'div'} variant="h5" style={{ color: '#333333', fontWeight: 'bold', fontSize: '22px' }}>
            Total Tasks
          </Typography>
          <Chip component={'div'} size="small" label={totalPatientsLength} color="secondary" className={styles.personCountChip} />
        </div>
        {totalPatientsLength === 0 && (
          <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>No tasks available</Typography>
          </div>
        )}
        {totalPatientsLength > 0 && (
          <>
            <div className={styles.pendingPatients}>
              <div className={styles.sectionTitle}>
                <Typography component={'div'} variant="h5" style={{ color: '#333333', fontWeight: 'bold', fontSize: '20px' }}>
                  Incomplete Tasks
                </Typography>
                <Chip size="small" label={pendingPatients.length} className={styles.pendingCountChip} component={'div'} />
              </div>
              <PatientCards details={pendingPatients} onSelect={(patient) => setOpenPatient(patient)} />
            </div>
            <div className={styles.completedPatients}>
              <div className={styles.sectionTitle}>
                <Typography component={'div'} variant="h5" style={{ color: '#333333', fontWeight: 'bold', fontSize: '20px' }}>
                  Completed Tasks
                </Typography>
                <Chip size="small" label={completedPatients.length} className={styles.successCountChip} component={'div'} />
              </div>
              <PatientCards details={completedPatients} onSelect={(patient) => setOpenPatient(patient)} />
            </div>
          </>
        )}
        {openPatient && <AttendanceComponent open={openPatient !== null} handleClose={() => setOpenPatient(null)} patient={openPatient} contractedPersonResponse={contractedPersonResponse} />}
      </div>
    );
  }
};

export default PatientsComponent;
