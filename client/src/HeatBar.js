import React from 'react';
import './HeatBar.scss';


const HeatBar = (props)=>{
    console.log(props)
    const style = {
        clipPath: "inset(0 0 "+props.risk*2+"% 0)"
    }
    return <>
    <div id="heat-bar">
        <div id="clip" style={style}></div>
    </div>
    </>
}

export default HeatBar;