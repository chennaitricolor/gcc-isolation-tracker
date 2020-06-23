import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../components/LoadingComponent';
import Alert from '@material-ui/lab/Alert';
import zoneActions from '../actions/GetZonesAction';
import addActions from '../actions/addContractedPersonsAction';
import AddNewPatientComponent from '../components/AddNewPatientComponent';

const loadingComponentStyle = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px',
};

const AddNewPatientContainer = (props) => {
  const { onCancel } = props;
  const dispatch = useDispatch();
  const getAllZones = useSelector((state) => state.getAllZonesReducer);

  const onSubmit = (payload) => {
    dispatch({type:addActions.ADD_CONTRACTED_PERSONS, payload})
  }

  if (getAllZones !== undefined && getAllZones.isLoading) {
    return <LoadingComponent isLoading={getAllZones.isLoading} style={loadingComponentStyle} />;
  }

  if ((getAllZones !== undefined && getAllZones.allZonesError) || !getAllZones) {
    return (
      <Alert style={{ fontWeight: 'bold', justifyContent: 'center' }} severity={'error'}>
        Error connecting to server.. Please try later..
      </Alert>
    );
  }

  return <AddNewPatientComponent onSubmit={onSubmit} onCancel={onCancel} zones={getAllZones.allZones} />;
};

export default AddNewPatientContainer;
