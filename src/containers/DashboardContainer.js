import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import zoneActions from '../actions/GetZonesAction';
import typesActions from '../actions/GetQuarantineTypesAction';
import PatientsContainer from './PatientsContainer';
import AddNewPatientContainer from './AddNewPatientContainer';
import ToastComponent from '../components/ToastComponent';

const FabStyle = { position: 'absolute', top: '90%', left: '80%', backgroundColor: '#3C6886' };

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

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

  return (
    <>
      {!isFormOpen && (
        <div style={{ height: '92%' }}>
          <PatientsContainer />
          <AddPatient />
        </div>
      )}
      {isFormOpen && (
        <AddNewPatientContainer
          onCancel={() => setFormOpen(false)}
          onSuccess={(message) => {
            setToastMessage(message);
            setFormOpen(false);
          }}
        />
      )}
      <ToastComponent openToast={toastMessage} toastMessage={toastMessage} handleClose={() => setToastMessage(null)} toastVariant="success" />
    </>
  );
};

DashboardContainer.propTypes = {};

export default DashboardContainer;
