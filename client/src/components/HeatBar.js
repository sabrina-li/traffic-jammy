import React from 'react';
import './HeatBar.scss';


const HeatBar = (props)=>{
    const precentage=props.risk>100?100:props.risk;
    const style = {
        clipPath: "inset(0 0 "+precentage+"% 0)"
    }
    return <div id="bar-wrapper">
        <div id="heat-title">Risk: <span>{precentage}</span></div>
        <div id="heat-bar">
            <div id="clip" style={style}></div>
        </div>
    </div>
}

export default HeatBar;