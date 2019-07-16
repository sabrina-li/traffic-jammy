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
                <Typography variant="h4" gutterBottom className="facts">Nearly <span className="red">1.25 million</span> people die in road crashes each year</Typography>
                <Typography variant="h4" gutterBottom className="facts">An additional <span className="red">20-50 million</span> are injured or disabled each year</Typography>
                <Typography variant="h4" gutterBottom className="facts">More than <span className="red">90</span> people die in car accidents every day</Typography>
                <Typography variant="h4" gutterBottom className="facts">Every <span className="red">16 minutes</span>, a car accident occurs that results in death</Typography>
                <Typography variant="h4" gutterBottom className="facts">Drive safe, <span className="red">K</span>now <span className="red">Y</span>our <span className="red">R</span>oads!</Typography>
            </main>
            <a className="footer" href="/map">
                <Typography variant="body1" gutterBottom className="page-text">GO TO MAP</Typography>
                <i class="fas fa-chevron-down fas-4x"></i>
            </a>
        </div>
    </>
}

export default Welcome;