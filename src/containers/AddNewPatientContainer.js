import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../components/LoadingComponent';
import Alert from '@material-ui/lab/Alert';
import addActions from '../actions/addContractedPersonsAction';
import AddNewPatientComponent from '../components/AddNewPatientComponent';
import AddPatientPreviewComponent from '../components/AddPatientPreviewComponent';

const loadingComponentStyle = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px',
  height: '100%',
  zIndex: '11',
  display: 'table',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
};

const AddNewPatientContainer = (props) => {
  const { onCancel } = props;
  const dispatch = useDispatch();

  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const getAllZones = useSelector((state) => state.getAllZonesReducer);
  const getQuarantineTypes = useSelector((state) => state.getQuarantineTypesReducer);

  const handlePreview = (payload) => {
    setShowPreview(true);
    setPreviewData(payload);
  };

  const handleSubmit = (payload) => {
    dispatch({ type: addActions.ADD_CONTRACTED_PERSONS, payload });
    setShowPreview(false);
    setPreviewData(null);
  };

  const handleCloseForPreview = () => {
    setShowPreview(false);
    setPreviewData(null);
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

  return (
    <div style={{ height: '100%' }}>
      <AddNewPatientComponent
        onSubmit={handlePreview}
        onCancel={onCancel}
        zones={getAllZones.allZones}
        wards={getAllZones.wardsMapping}
        types={getQuarantineTypes.types}
      />
      {showPreview && (
        <AddPatientPreviewComponent
          showPreview={showPreview}
          handleCloseForPreview={handleCloseForPreview}
          getAllZones={getAllZones.allZones}
          getQuarantineTypes={getQuarantineTypes.types}
          previewData={previewData}
          handleSave={handleSubmit}
        />
      )}
    </div>
  );
};

export default AddNewPatientContainer;
