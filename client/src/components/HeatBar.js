import React from 'react';
import './HeatBar.scss';



const HeatBar = (props) => {
    const percentage = props.risk > 100 ? 100 : props.risk;
    const style = {
        clipPath: "inset(0 0 " + percentage + "% 0)",
        animation: "rise 1s ease-in-out"
    }
    return <div id="bar-wrapper">
            <p>Risk:</p>
            <div id="heat-title"> <span>{percentage}</span>/100</div>
            <div id="heat-bar">
                <div id="clip" style={style}></div>
            </div>

        </div>
    
}

export default HeatBar;