import React from 'react';
import './App.css';
import SimpleMapPage from './GoogleMap.js'


function App() {
  return (
    <div className="App" style={{ height: '100vh', width: '100%' }}>
      <SimpleMapPage></SimpleMapPage>
    </div>
  );
}

export default App;
