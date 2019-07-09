import React from 'react';
import API from "./utils/API";
import GoogleMarker from './GoogleMarker.js';

class GoogleMarkerList extends React.Component{
    
    state={}
    componentDidMount(){
        API.getAllViolations().then(response=>{
            console.log(response.data);
            this.setState({data:response.data})
        })
    }

    render(){
        console.log(this.state)
        let list = null;
        if(this.state.data){
            list = this.state.data.map(loc=>{
                return <GoogleMarker 
                            {...this.props}
                            position={{
                                lat:loc.latitude,
                                lng:loc.longitude
                            }}
                            key={loc._id}
                            id={loc._id}>
                        </GoogleMarker>
            })
        }
        return list;
    }
    
}

export default GoogleMarkerList;