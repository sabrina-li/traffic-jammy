import React from 'react';
import './Welcome.scss'
import Typography from '@material-ui/core/Typography';


//TODO: this is for the wal through modal
// import Grid from '@material-ui/core/Grid';
// import AlertDialogSlide from '../components/AlertDialogSlide.js'
// const intro=[
//     {
//         title:"Visualize Data",
//         imageLink:"test",
//         imageTitle:"Data",
//         bodyText:"Utilize real life data from public database, including fatalities, crashes, police sightings from various platforms and data source to consolidate and visualize historical traffic and accident data, enable drivers who are unfamiliar to the area to be able to have driving intuitions which could only be obtained by experience"
//     },
//     {
//         title:"Visualize Data",
//         imageLink:"test",
//         imageTitle:"Data",
//         bodyText:"Utilize real life data from public database, including fatalities, crashes, police sightings from various platforms and data source to consolidate and visualize historical traffic and accident data, enable drivers who are unfamiliar to the area to be able to have driving intuitions which could only be obtained by experience"
//     },
//     {
//         title:"Visualize Data",
//         imageLink:"test",
//         imageTitle:"Data",
//         bodyText:"Utilize real life data from public database, including fatalities, crashes, police sightings from various platforms and data source to consolidate and visualize historical traffic and accident data, enable drivers who are unfamiliar to the area to be able to have driving intuitions which could only be obtained by experience"
//     },
// ]



class Welcome extends React.Component{
    state={
        fly1:false,
        fly2:false
    }

    pageTransition = (evt)=>{
        evt.preventDefault();
        this.setState({
            fly1:true
        })
        setTimeout(() => {
            this.setState({
            fly2:true
            })
        }, 500);
        setTimeout(() => {

            console.log(evt)
            window.location ="/map"
        }, 1500);
    }

    render(){
        return <>
        <div className="welcome">
            <main className={this.state.fly1?"fly-away":""}>
                <Typography variant="h4" gutterBottom className={(!this.state.fly1?"roll":"")+" facts"}>Nearly <span className="red">1.25 million</span> people die in road crashes each year</Typography>
                <Typography variant="h4" gutterBottom className={(!this.state.fly1?"roll":"")+" facts"}>An additional <span className="red">20-50 million</span> are injured or disabled each year</Typography>
                <Typography variant="h4" gutterBottom className={(!this.state.fly1?"roll":"")+" facts"}>More than <span className="red">90</span> people die in car accidents every day</Typography>
                <Typography variant="h4" gutterBottom className={(!this.state.fly1?"roll":"")+" facts"}>Every <span className="red">16 minutes</span>, a car accident occurs that results in death</Typography>
                <Typography variant="h4" gutterBottom className={(!this.state.fly1?"roll":"")+" facts"}>Drive Safe, <span className="red">K</span>now <span className="red">Y</span>our <span className="red">R</span>oads!</Typography>
            </main>
            <a className={(this.state.fly2?"fly-away-fast":"")+" footer"} href="/map" onClick={this.pageTransition}>
                <Typography variant="h6" gutterBottom className="page-text">GO TO MAP</Typography>
                <i className="fas fa-chevron-down fa-2x"></i>
            </a>
        </div>
    </>
    }
}

export default Welcome;