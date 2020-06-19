import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import range from 'lodash/range';
import map from 'lodash/map';
import AttendanceComponent from './AttendanceComponent';

const pendingPatients = [
  {
    Name: 'Maran S',
    Address: '3, Gandhi Street, Velachery, Perungudi,Chennai',
    Phone: '123456788',
    currentDate: 5,
  },
];

const AttendanceMarker = ({ marked }) => {
  return <span style={{ background: marked ? 'green' : '#BDBDBD', borderRadius: '50%', display: 'inline-block', height: '3vh', width: '3vh' }} />;
};

const PatientCards = ({ details, onSelect }) => {
  return details.map((detail) => {
    const { Name, Address, Phone, currentDate } = detail;
    return (
      <div style={{ border: '1px solid', padding: '1%', display: 'flex', flexFlow: 'column' }} onClick={() => onSelect(detail)}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3">
            <span>{Name}</span>
          </Typography>
          <Typography>
            <Chip label={`Day ${currentDate}`} color="secondary" />
          </Typography>
        </div>
        <Typography>
          <span>{Address}</span>
        </Typography>
        <Typography>
          <span>{Phone}</span>
        </Typography>
        <div style={{ display: 'flex' }}>
          {map(range(13), (index) => (
            <AttendanceMarker marked={currentDate > index + 1} />
          ))}
        </div>
      </div>
    );
  });
};

const PatientsComponent = () => {
  const [openPatient, setOpenPatient] = useState(null);

  return (
    <div style={{ height: '100%', overflow: 'scroll' }}>
      <div style={{ padding: '5% 5% 0' }}>
        <Typography variant="h5">
          Patients
          <Chip size="small" label="0" color="secondary" style={{ width: '10%', margin: '-2% 0 0 2%' }} />
        </Typography>
      </div>
      {/* <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>No tasks available</Typography>
      </div> */}
      <div style={{ padding: '5%', borderBottom: '1px solid' }}>
        <Typography variant="h5">
          Pending
          <Chip size="small" label="0" style={{ background: '#F2994A', width: '10%', margin: '-2% 0 0 2%' }} />
        </Typography>
        <PatientCards details={pendingPatients} onSelect={(patient) => setOpenPatient(patient)} />
      </div>
      <div style={{ padding: '5%' }}>
        <Typography variant="h5">
          Completed
          <Chip size="small" label="0" style={{ background: 'green', width: '10%', margin: '-2% 0 0 2%' }} />
        </Typography>
        <PatientCards details={pendingPatients} />
      </div>
      {openPatient && <AttendanceComponent open={openPatient !== null} handleClose={() => setOpenPatient(null)} patient={openPatient} />}
    </div>
  );
};

export default PatientsComponent;
