import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../components/LoadingComponent';
import Alert from '@material-ui/lab/Alert';
import personActions from '../actions/getPersonsDetailAction';
import PatientsComponent from '../components/PatientsComponent';

const loadingComponentStyle = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px',
};

const PatientsContainer = () => {
  const dispatch = useDispatch();
  const personsList = useSelector((state) => state.getPersonsDetailReducer);
  const getAllZones = useSelector((state) => state.getAllZonesReducer);

  useEffect(() => {
    dispatch({
      type: personActions.GET_PERSONS_DETAILS,
    });
  }, [dispatch]);

  if (!personsList) {
    return (
      <Alert style={{ fontWeight: 'bold', justifyContent: 'center' }} severity={'error'}>
        Error connecting to server.. Please try later..
      </Alert>
    );
  }

  if (personsList.isLoading || getAllZones.isLoading) {
    return <LoadingComponent isLoading={true} style={loadingComponentStyle} />;
  }

  return <PatientsComponent patients={personsList.personsDetails} zones={getAllZones.allZones} />;
};

export default PatientsContainer;
