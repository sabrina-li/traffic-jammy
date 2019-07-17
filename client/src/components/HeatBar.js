import React from 'react';
import './HeatBar.scss';
import Typography from '@material-ui/core/Typography';


const HeatBar = (props) => {
    const percentage = props.risk > 100 ? 100 : props.risk;
    const style = {
        clipPath: "inset(0 0 " + percentage + "% 0)",
        // animation: "rise 1s ease-in-out"
    }
    return <div id="bar-wrapper">
            <Typography variant="h6">Risk:</Typography>
            <Typography variant="h6" id="heat-title"> <span>{percentage}</span>/100</Typography>
            <div id="heat-bar">
                <div id="clip" style={style} className={props.animate?"animate":""}></div>
            </div>
        </div>
    
}

export default HeatBar;