import React, { useState } from 'react';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import DashboardContainer from './containers/DashboardContainer';

function App() {

  return (
    <div className="App">
      <HeaderComponent />
      <DashboardContainer />
    </div>
  );
}

export default App;
