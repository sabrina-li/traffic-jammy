import React from 'react';
import './HeatBar.scss';


const HeatBar = (props)=>{
    const style = {
        clipPath: "inset(0 0 "+props.risk+"% 0)"
    }
    return <div id="bar-wrapper">
        <div id="heat-title">Calculated Risk</div>
        <div id="heat-bar">
            <div id="clip" style={style}></div>
        </div>
    </div>
}

export default HeatBar;