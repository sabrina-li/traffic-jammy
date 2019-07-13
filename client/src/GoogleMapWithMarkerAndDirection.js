// import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import React from 'react';
import PlacesAutocompleteInput from './PlacesAutocomplete.js';
import './googleMap.css';
import API from "./utils/API";
import  { compose, withProps, withHandlers, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";


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
      if(this.props.haveDir){
        const DirectionsService = new window.google.maps.DirectionsService();
        DirectionsService.route({
          origin: new window.google.maps.LatLng(this.props.origin.lat, this.props.origin.lng),
          destination: new window.google.maps.LatLng(this.props.destination.lat, this.props.destination.lng),
          travelMode: window.google.maps.TravelMode.DRIVING,//default to driving
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }
      
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={9}
    defaultCenter={{ lat: 33.7490, lng: -84.3880 }}//default to atlanta
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons={true}
      defaultEnableRetinaIcons
      gridSize={40}
    >
      {props.markers.map(marker => {
          return <Marker
          icon={"/cemetery-512.png"}//set custome icon
          key={marker._id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      })}
    </MarkerClusterer>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

class GoogleMapWithMarkerAndDirection extends React.PureComponent {
  componentWillMount() {
    this.setState({ 
      markers: []
    })
  }
  
  componentDidMount() {
    API.getAllViolations().then(response=>{
        this.setState({
          markers:response.data,
          googleMapsReady:true
        })
    })
  }
  
  render() {
    return (<>
        <label>From</label>
        <PlacesAutocompleteInput googleMapsReady={this.state.googleMapsReady}></PlacesAutocompleteInput>
        <label>To</label>
        <PlacesAutocompleteInput googleMapsReady={this.state.googleMapsReady}></PlacesAutocompleteInput>
        <MapWithAMarkerClusterer markers={this.state.markers} {...this.props}/> 
      </>
    )
  }
}
export default GoogleMapWithMarkerAndDirection;