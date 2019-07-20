import React from 'react';
import dotenv from 'dotenv'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GoogleMapWithMarkerAndDirection from './pages/GoogleMapWithMarkerAndDirection.js'
import Welcome from './pages/Welcome.js'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

dotenv.config();

function HideOnScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

HideOnScroll.propTypes = {
	children: PropTypes.node.isRequired,
	// Injected by the documentation to work in an iframe.
	// You won't need it on your project.
	window: PropTypes.func,
};

function App() {
  return (
    <Router>
      <div className="background">
      <HideOnScroll >
      <header>
                <Typography variant="h2" gutterBottom className="fixed-title">KYR </Typography>
                <Typography variant="h6" gutterBottom className="fixed-subtitle"> Know Your Roads. An interactive traffic & road conditions analytic map.</Typography>
      </header>
      </HideOnScroll>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/map" component={GoogleMapWithMarkerAndDirection} />
          {/* <Route exact path="/books/:id" component={Detail} /> */}
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
