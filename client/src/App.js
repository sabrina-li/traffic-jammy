import React from 'react';
import './App.css';

import DirectionsForm from './DirectionsForm.js';
// import SimpleMapPage from './GoogleMap.js'
import DemoApp from './GoogleMarkerCluster.js'
// import MyMapComponent from './GoogleMap.js'



function App() {
  return (
    <div className="App" style={{ height: '100vh', width: '100%' }}>
      {/* <SimpleMapPage></SimpleMapPage> */}
      {/* <MyMapComponent 
        isMarkerShown 
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}/> */}
        <DirectionsForm />
        <DemoApp />
        
    </div>
  );
}

export default App;
