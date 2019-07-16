import React from 'react';
import './Welcome.scss'
import Typography from '@material-ui/core/Typography';


const Welcome = (props)=>{
    return <>
        <div id="background">
            <header>
                <Typography variant="h2" gutterBottom className="fixed-title">KYR </Typography>
                <Typography variant="h6" gutterBottom className="fixed-title"> Know Your Roads</Typography>
            </header>
            <main>
                <Typography variant="h4" gutterBottom className="facts">Nearly 1.25 million people die in road crashes each year</Typography>
                <Typography variant="h4" gutterBottom className="facts">An additional 20-50 million are injured or disabled each year</Typography>
                <Typography variant="h4" gutterBottom className="facts">More than 90 people die in car accidents every day</Typography>
                <Typography variant="h4" gutterBottom className="facts">Every 16 minutes, a car accident occurs that results in death</Typography>
                <Typography variant="h4" gutterBottom className="facts">Drive safe, know your roads!</Typography>
            </main>
        </div>
    </>
}

export default Welcome;