import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../components/LoadingComponent';
import Alert from '@material-ui/lab/Alert';
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
  const getQuarantineTypes = useSelector((state) => state.getQuarantineTypesReducer);

  const handleSubmit = (payload) => {
    dispatch({ type: addActions.ADD_CONTRACTED_PERSONS, payload });
    onCancel();
  };

  if ((getAllZones !== undefined && getAllZones.isLoading) || (getQuarantineTypes !== undefined && getQuarantineTypes.isLoading)) {
    return <LoadingComponent isLoading={true} style={loadingComponentStyle} />;
  }

  if (
    (getAllZones !== undefined && getAllZones.allZonesError) ||
    !getAllZones ||
    (getQuarantineTypes !== undefined && getQuarantineTypes.allZonesError) ||
    !getQuarantineTypes
  ) {
    return (
      <Alert style={{ fontWeight: 'bold', justifyContent: 'center' }} severity={'error'}>
        Error connecting to server.. Please try later..
      </Alert>
    );
  }

  return <AddNewPatientComponent onSubmit={handleSubmit} onCancel={onCancel} zones={getAllZones.allZones} types={getQuarantineTypes.types} />;
};

export default AddNewPatientContainer;
