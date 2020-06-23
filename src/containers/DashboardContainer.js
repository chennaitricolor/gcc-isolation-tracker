import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import zoneActions from '../actions/GetZonesAction';
import typesActions from '../actions/GetQuarantineTypesAction';
import toastActions from '../actions/ToastAction';
import PatientsContainer from './PatientsContainer';
import AddNewPatientContainer from './AddNewPatientContainer';
import ToastComponent from '../components/ToastComponent';

const FabStyle = { position: 'absolute', top: '90%', left: '80%', backgroundColor: '#3C6886' };

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setFormOpen] = useState(false);
  const toastMessage = useSelector(state => state.toastMessageReducer.toastMessage);

  useEffect(() => {
    dispatch({
      type: typesActions.GET_QUARANTINE_TYPE,
    });
    dispatch({
      type: zoneActions.GET_ALL_ZONE,
    });
  }, [dispatch]);

  const setToastMessage = (payload) => {
    dispatch({
      type: toastActions.SET_TOAST_MESSAGE,
      payload,
    });
  }

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
        />
      )}
      <ToastComponent openToast={toastMessage} toastMessage={toastMessage} handleClose={() => setToastMessage(null)} toastVariant="success" />
    </>
  );
};

DashboardContainer.propTypes = {};

export default DashboardContainer;
