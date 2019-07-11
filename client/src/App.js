import React from 'react';
import './App.css';
import dotenv from 'dotenv'
// import DirectionsForm from './DirectionsForm.js';
import DemoApp from './GoogleMarkerCluster.js'

dotenv.config();


function App() {
  return (
    <div className="App" style={{ height: '100vh', width: '100%' }}>
      <DemoApp />
      {/* <DirectionsForm /> */}
    </div>
  );
}

export default App;
