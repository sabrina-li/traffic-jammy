import React, { Component } from 'react';
import Map, { GoogleApiWrapper} from 'google-maps-react';
import  {Marker,InfoWindow} from 'google-maps-react';
import dotenv from 'dotenv'
import GoogleMarker from './googleMarker.js';
import './googleMap.css';

dotenv.config();

const gKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    
    // TEST using iframe - embedded map no cost
    // const src = "https://www.google.com/maps/embed/v1/place?q=atlanta&key="+gKey;
    // return <iframe title="maps" width="600" height="450" frameBorder="0" style={{border:0}} src={src} allowFullScreen></iframe>

    //conditional load script inside react:
    // var loadScript = function(src) {
    //     var tag = document.createElement('script');
    //     tag.async = false;
    //     tag.src = src;
    //     document.getElementsByTagName('body').appendChild(tag);
    //   }
    // loadScript('//cdnjs.com/some/library.js')
 
export class SimpleMapPage extends Component {
    static defaultProps= {
            center: {
                lat: 33.753746,
                lng: -84.386330
            },
            position:{
                lat: 33.753746,
                lng: -85.386330
            },
            zoom: 11
        };
        // state= {selectedPlace:{name:"atlanta"}};

render() {
    console.log(this.props.position)
    return (
      <Map google={this.props.google} zoom={14} initialCenter={this.props.center}>
        <GoogleMarker {...this.props}></GoogleMarker>
      </Map>
    );
  }
} 

const LoadingContainer = (props) => (
    <div>Fancy loading container!</div>
)

export default GoogleApiWrapper({
    apiKey: gKey,
    LoadingContainer:LoadingContainer
})(SimpleMapPage)

