import React from 'react';
import './Welcome.scss'
import Typography from '@material-ui/core/Typography';


const Welcome = (props)=>{
    return <>
        <div id="background">
            <header>
            <Typography variant="h3" gutterBottom className="fixed-title">KYR </Typography>
            <Typography variant="h4" gutterBottom className="fixed-title"> Know Your Roads</Typography>
            </header>
            
        </div>
    </>
}

export default Welcome;