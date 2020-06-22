import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PatientsContainer from './PatientsContainer';
import AddNewPatientComponent from '../components/AddNewPatientComponent';

const loadingComponentStyle = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px',
};

const FabStyle = { position: 'absolute', top: '80%', left: '80%' };

const DashboardContainer = () => {
  const [isFormOpen, setFormOpen] = useState(false);

  const AddPatient = () => (
    <Fab color="secondary" aria-label="add" style={FabStyle} onClick={() => setFormOpen(true)}>
      <AddIcon />
    </Fab>
  );

  if (!isFormOpen) {
    return (
      <div style={{ height: '100%' }}>
        <PatientsContainer />
        <AddPatient />
      </div>
    );
  }

  return <AddNewPatientComponent />;
};

DashboardContainer.propTypes = {};

export default DashboardContainer;
