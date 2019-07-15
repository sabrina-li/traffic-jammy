// import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import React from 'react';
import PlacesAutocompleteInput from './PlacesAutocomplete.js';
import HeatBar from './HeatBar.js'
import './googleMap.scss';
import 'bulma/css/bulma.css'
import { API, Polyline } from "./utils";
import { compose, withProps, withHandlers, lifecycle } from "recompose";
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
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + gKey + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div id="map" />,
    containerElement: <div id="map" />,
    mapElement: <div id="map" />,
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
      // console.log("propsssss:",this.props)
      // if(this.props.haveDir){
      //   const DirectionsService = new window.google.maps.DirectionsService();
      //   DirectionsService.route({
      //     origin: new window.google.maps.LatLng(this.props.origin.lat, this.props.origin.lng),
      //     destination: new window.google.maps.LatLng(this.props.destination.lat, this.props.destination.lng),
      //     travelMode: window.google.maps.TravelMode.DRIVING,//default to driving
      //   }, (result, status) => {
      //     if (status === window.google.maps.DirectionsStatus.OK) {
      //       this.setState({
      //         directions: result,
      //       });
      //     } else {
      //       console.error(`error fetching directions ${result}`);
      //     }
      //   });
      // }

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
  state = {
    origin: {
      lat: 33.7490,
      lng: -84.3880
    },
    destination: {
      lat: 33.9490,
      lng: -84.0880
    },
    risk: 0
  }

  setLatLng = (name, latLng) => {
    this.setState(
      { [name]: latLng }
    )
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //TODO: check both origin and destination are there

    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route({
      origin: new window.google.maps.LatLng(this.state.origin.lat, this.state.origin.lng),
      destination: new window.google.maps.LatLng(this.state.destination.lat, this.state.destination.lng),
      travelMode: window.google.maps.TravelMode.DRIVING,//default to driving
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        Polyline.predict(Polyline.decode(result.routes[0].overview_polyline), this.state.markers)
          .then(risk => {
            console.log("risk", risk)
            this.setState({
              risk: risk
            })
          });
        this.setState({
          directions: result,
        });

        //TODO: count the points near all these locations
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });

  }


  componentWillMount() {
    this.setState({
      markers: [],
      googleMapsReady: false//Make sure the map is not ready before mounting, for auto complete
    })
  }

  componentDidMount() {
    //TODO: load only markers in the shown map area, have to handle on zoom
    //load all traffic violations form DB
    API.getAllViolations().then(response => {
      this.setState({
        markers: response.data,
        googleMapsReady: true
      })
    })
  }

  render() {
    return (<>
      <form onSubmit={this.handleSubmit} className="columns">
        <div className="column">
          <span>From</span>
          <PlacesAutocompleteInput googleMapsReady={this.state.googleMapsReady} setLatLng={this.setLatLng} name="origin"></PlacesAutocompleteInput>
        </div>
        <div className="column">
          <label>To</label>
          <PlacesAutocompleteInput googleMapsReady={this.state.googleMapsReady} setLatLng={this.setLatLng} name="destination"></PlacesAutocompleteInput>
        </div>
        <div className="column">
          <input type="submit" ></input>
        </div>

      </form>
      <div className="columns">
        <MapWithAMarkerClusterer {...this.state}/>
        <HeatBar risk={this.state.risk}></HeatBar>
      </div>
    </>
    )
  }
}
export default GoogleMapWithMarkerAndDirection;