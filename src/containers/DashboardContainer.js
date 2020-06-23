import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import zoneActions from '../actions/GetZonesAction';
import typesActions from '../actions/GetQuarantineTypesAction';
import PatientsContainer from './PatientsContainer';
import AddNewPatientContainer from './AddNewPatientContainer';

const FabStyle = { position: 'absolute', top: '90%', left: '80%', backgroundColor: '#3C6886' };

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setFormOpen] = useState(false);

  useEffect(() => {
    dispatch({
      type: typesActions.GET_QUARANTINE_TYPE,
    });
    dispatch({
      type: zoneActions.GET_ALL_ZONE,
    });
  }, [dispatch]);

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

  return <AddNewPatientContainer onCancel={() => setFormOpen(false)} />;
};

DashboardContainer.propTypes = {};

export default DashboardContainer;
