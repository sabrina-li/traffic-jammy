import React from 'react';
import {Marker, InfoWindow} from 'google-maps-react';

const GoogleMarker = (props)=>{
    // console.log(props.position)
    
    return <Marker
    {...props}
    // title="Location"
    id={props._id}
    position={props.position}
    draggable={true}

    // onDragend={this.moveMarker.bind(this)}
    >
    {/* <InfoWindow
        visible={showInfoWindow}
        style={styles.infoWindow}
        >
        <div className={classes.infoWindow}>
            <p>Click on the map or drag the marker to select location where the incident occurred</p>
        </div>
    </InfoWindow> */}
    </Marker>
}

export default GoogleMarker;