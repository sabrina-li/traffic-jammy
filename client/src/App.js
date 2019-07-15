import React from 'react';
import dotenv from 'dotenv'
// import DirectionsForm from './DirectionsForm.js';
import GoogleMapWithMarkerAndDirection from './GoogleMapWithMarkerAndDirection.js'

dotenv.config();


function App() {
  return (
    <div className="App" style={{ height: '100vh', width: '100%' }}>
      <GoogleMapWithMarkerAndDirection></GoogleMapWithMarkerAndDirection>
    </div>
  );
}

export default App;
