import React, { Component } from 'react';
import dotenv from 'dotenv'
import './googleMap.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

dotenv.config();
const gKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))

export default MyMapComponent;