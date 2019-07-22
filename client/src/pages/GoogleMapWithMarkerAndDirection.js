import React from 'react';
import './googleMap.scss';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

import { compose, withProps, withHandlers } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	DirectionsRenderer,
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

import { API, Polyline } from "../utils";
import PlacesAutocompleteInput from '../components/PlacesAutocomplete.js';
import HeatBar from '../components/HeatBar.js'
import SimpleModal from '../components/SimpleModal'

const gKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapWithAMarkerClusterer = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + gKey + "&v=3.exp&libraries=geometry,drawing,places,visualization",
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
		{console.log("props",props)}
		<MarkerClusterer
			onClick={props.onMarkerClustererClick}
			averageCenter
			enableRetinaIcons={true}
			defaultEnableRetinaIcons
			gridSize={40}
		>
			{props.resultMarkers.map(marker => {
				console.log("result marker:",marker);
				return <Marker
					icon={"/cemetery-512.png"}//set custome icon
					key={marker._id}
					position={{ lat: marker.latitude, lng: marker.longitude }}
				/>
			})}
		</MarkerClusterer>
		{console.log("gmarkers:",props.gmarkers)}
		<HeatmapLayer data={props.gmarkers.map(pt => { return new window.google.maps.LatLng(pt.latitude, pt.longitude) })} options={{ opacity: 0.5, radius: 20, maxIntensity: 13 }}></HeatmapLayer>
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
		name = name.toLowerCase();
		this.setState(
			{ [name]: latLng }
		)
		console.log("setlatlng",this.state)
	}

	handleSubmit = (event) => {
		event.preventDefault();
		//TODO: check both origin and destination are there

		const DirectionsService = new window.google.maps.DirectionsService();
		console.log("origin",this.state.origin);
		console.log("destination",this.state.destination);

		DirectionsService.route({
			origin: new window.google.maps.LatLng(this.state.origin.lat, this.state.origin.lng),
			destination: new window.google.maps.LatLng(this.state.destination.lat, this.state.destination.lng),
			travelMode: window.google.maps.TravelMode.DRIVING,//default to driving
		}, (result, status) => {
			console.log(this.state);
			if (status === window.google.maps.DirectionsStatus.OK) {
				Polyline.predict(Polyline.decode(result.routes[0].overview_polyline), this.state.gmarkers)
					.then(risk => {
						risk = Math.round(risk * 100) / 100
						this.setState({
							risk: risk,
							animate: true//used for animate the risk bar rise
						})
					});
				//TODO: handle removing and re-adding the animation class more gracefully
				setTimeout(() => {
					this.setState({
						animate: false
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
			gmarkers: [],
			resultMarkers:[],
			flyIn: false,
			googleMapsReady: false//Make sure the map is not ready before mounting, for auto complete
		})
	}


	componentDidMount() {
		//TODO: dynamically change the header height via react
		// document.getElementsByTagName("header")[0].style.height="100px";
		document.querySelector("header").style.height = "100px";
		//TODO: load only markers in the shown map area, have to handle on zoom
		//load all traffic violations form DB
		API.getAllViolations().then(response => {
			console.log("response:",response.data)
			this.setState({
				gmarkers: response.data
			})
		})
		//TODO: this is a temp work around for the google api load issue, will work on permanent solution
		setTimeout(() => {
			this.setState({
				googleMapsReady: true
			})
		}, 1000);
		setTimeout(() => {
			this.setState({
				flyIn: true
			})
		}, 200);
	}

	setResultMarkers = (markers)=>{
		this.setState({
			resultMarkers:markers
		})
	}


	render() {
		return (<>
			<form noValidate autoComplete="off" onSubmit={this.handleSubmit} className="fly-in search-bar">
				<AppBar position="static" color="inherit">
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
						id="input-form"
					>
						<Grid item xs={6} sm={5}>
							<span className="label">From: </span><PlacesAutocompleteInput googleMapsReady={this.state.googleMapsReady} setLatLng={this.setLatLng} name="Origin"></PlacesAutocompleteInput>
						</Grid>
						<Grid item xs={6} sm={5}>
							<span className="label">To: </span><PlacesAutocompleteInput googleMapsReady={this.state.googleMapsReady} setLatLng={this.setLatLng} name="Destination"></PlacesAutocompleteInput>
						</Grid>
						<Button variant="outlined" onClick={this.handleSubmit}>Submit</Button>
					</Grid>
				</AppBar>
			</form>

			<Container className={(this.state.flyIn ? "fly-in" : "hide") + " map-container"}>
				<Grid
					container
					direction="row"
					justify="center"
				// alignItems="center"
				>
					{/*<Grid item sm={1}>
						 <FormControl component="fieldset">
							<FormLabel component="legend">Assign responsibility</FormLabel>
							<FormGroup>
								<FormControlLabel
									control={<Checkbox checked="true" value="gilad" />}
									label="Gilad Gray"
								/>
							</FormGroup>
							<FormHelperText>Be careful</FormHelperText>
						</FormControl> 
					</Grid>*/}
					{console.log("state here:",this.state)}
						<Grid item sm={8}><MapWithAMarkerClusterer {...this.state} /></Grid>
						<Grid item sm={1}><HeatBar risk={this.state.risk} animate={this.state.animate}></HeatBar></Grid>
						<Grid item sm={1}>
							<div style={{ paddingTop: "100px" }}></div>
							<Fab variant="extended" className="fa-btn-bottom">
								<i className="fas fa-plus fa-2x fa-btn-right"></i>
								{/* <span className="fab-text">Add Crash</span> */}
								<SimpleModal setResultMarkers={this.setResultMarkers}></SimpleModal>
							</Fab>
							<Fab variant="extended" className="fa-btn-bottom">
								<i className="fas fa-question fa-2x fa-btn-right"></i>
								<span className="fab-text">How to</span>
							</Fab>
						</Grid>
					</Grid>
			</Container>
				<footer className={this.state.flyIn ? "fly-in" : ""}>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
					>
						<Grid item sm={1}></Grid>
						<Grid item sm={6}>
							<Typography variant="body2" gutterBottom>
								This app utilize real life data from public database from <a href="https://www-fars.nhtsa.dot.gov/Main/index.aspx">FARS</a> fatalities data. Aiming to enable drivers who are unfamiliar to any area, to be able to have driving intuitions which could only be obtained by experience
						</Typography>
							<Typography variant="body2" gutterBottom>
								Coming soon: crashes, traffic citations and police sightings data to be included from various platforms and data source to consolidate and visualize historical traffic and accident data. Giving drivers even more insights on local situations.
						</Typography>
						</Grid>
						<Grid item sm={1}></Grid>
						<Grid item sm={2}>
							<p>Created by: <a href="https://sabrina-li.herokuapp.com"><Typography variant="caption" gutterBottom>Sabrina Li</Typography></a></p>
							Tech Stack: <Typography variant="caption" gutterBottom> MongoDB <br /> Express <br /> NodeJS <br /> React<br /> Google Map</Typography>
						</Grid>
					</Grid>
					<div id="copyright">© Copyright</div>
				</footer>
		</>
			)
		}
	}
	export default GoogleMapWithMarkerAndDirection;
	
