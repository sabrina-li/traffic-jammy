import React from 'react';
import dotenv from 'dotenv'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GoogleMapWithMarkerAndDirection from './pages/GoogleMapWithMarkerAndDirection.js'
import addData from './pages/addData.js'
import Welcome from './pages/Welcome.js'

dotenv.config();


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/map" component={GoogleMapWithMarkerAndDirection} />
          <Route exact path="/add" component={addData} />
          {/* <Route exact path="/books/:id" component={Detail} /> */}
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
