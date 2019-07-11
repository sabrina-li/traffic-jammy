// import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import React from 'react';
import dotenv from 'dotenv'
import './googleMap.css';
import API from "./utils/API";
const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");


dotenv.config();
const gKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+gKey+"&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new window.google.maps.DirectionsService();

      DirectionsService.route({
        origin: new window.google.maps.LatLng(33.7490, -84.3880),
        destination: new window.google.maps.LatLng(34.9304, -84.3733),
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log(result);
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={9}
    defaultCenter={{ lat: 33.7490, lng: -84.3880 }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
    //   enableRetinaIcons={true}
    //   defaultEnableRetinaIcons
      gridSize={40}
    >
      {props.markers.map(marker => {
          return <Marker
          icon={"/cemetery-512.png"}
          key={marker._id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      })}
    </MarkerClusterer>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

class DemoApp extends React.PureComponent {
  componentWillMount() {
    this.setState({ markers: [] })
  }
  
  componentDidMount() {
    API.getAllViolations().then(response=>{
        this.setState({markers:response.data})
    })
  }
  
  render() {
    return (
      <MapWithAMarkerClusterer markers={this.state.markers} />
    )
  }
}
export default DemoApp;