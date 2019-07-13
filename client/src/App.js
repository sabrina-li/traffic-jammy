import React from 'react';
import './App.css';
import dotenv from 'dotenv'
// import DirectionsForm from './DirectionsForm.js';
import GoogleMapWithMarkerAndDirection from './GoogleMapWithMarkerAndDirection.js'

dotenv.config();


function App() {
  const dir={
    origin:{
      lat:33.7490,
      lng:-84.3880
    },
    destination:{
      lat:33.9490,
      lng:-84.0880
    },
    haveDir:true
  }
  return (
    <div className="App" style={{ height: '100vh', width: '100%' }}>
      <GoogleMapWithMarkerAndDirection {...dir}></GoogleMapWithMarkerAndDirection>
    </div>
  );
}

export default App;
