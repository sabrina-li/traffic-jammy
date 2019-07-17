// import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import React from 'react';
import './googleMap.scss';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { compose, withProps, withHandlers } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	DirectionsRenderer,
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

import { API, Polyline } from "../utils";
import PlacesAutocompleteInput from '../components/PlacesAutocomplete.js';
import HeatBar from '../components/HeatBar.js'


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
			console.log(clickedMarkers[0].position.lat())
		},
	}),
	withScriptjs,
	withGoogleMap,
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
							risk: risk,
							animate:true//used for animate the risk bar rise
						})
					});
				//TODO: handle removing and re-adding the animation class more gracefully
				setTimeout(() => {
					this.setState({
						animate:false
					})
				}, 1500);
				this.setState({
					directions: result
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
				markers: response.data
			})
		})
		//TODO: this is a temp work around for the goole api load issue, will work on permanent solution
		setTimeout(() => {
			this.setState({
				googleMapsReady: true
			})
		}, 1000);
	}

	render() {
		return (<>
			<form noValidate autoComplete="off" onSubmit={this.handleSubmit}  className="search-bar">
				<Container maxWidth="lg">
					<Grid
						container
						direction="row"
						justify="left"
						alignItems="center"
						id="input-form"
					>
					<Grid item xs={6} sm={5}>
						From: <PlacesAutocompleteInput googleMapsReady={this.state.googleMapsReady} setLatLng={this.setLatLng} name="origin"></PlacesAutocompleteInput>
					</Grid>
					<Grid item xs={6} sm={5}>
						To: <PlacesAutocompleteInput googleMapsReady={this.state.googleMapsReady} setLatLng={this.setLatLng} name="destination"></PlacesAutocompleteInput>
					</Grid>
						<Button variant="outlined" color="primary" onClick={this.handleSubmit}>Submit</Button>
					</Grid>
				</Container>
			</form>

			<Container maxWidth="lg" className="map-container">
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<Grid item sm={1}></Grid>
					<Grid item sm={8}><MapWithAMarkerClusterer {...this.state} /></Grid>
					<Grid item sm={2}><HeatBar risk={this.state.risk} animate={this.state.animate}></HeatBar></Grid>
				</Grid>
			</Container>
		</>
		)
	}
}
export default GoogleMapWithMarkerAndDirection;