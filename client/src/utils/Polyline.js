//TODO: move this portion to server side
import polyline from '@mapbox/polyline';

// returns an array of lat, lon pairs from polyline6 by passing a precision parameter
export default {
    decode: input=>{
        return polyline.decode(input);
    },
    predict:(inputArr,dataArr)=>{
        // console.log("start",Date.now());
        return new Promise((res,rej)=>{
            let cnt = 0;
            //TODO: improve async for promise/resolution 
            dataArr.forEach(location => {
                inputArr.forEach(polylineLocation=>{
                    //TODO: not hard code this value here
                    if(Math.abs(location.latitude - polylineLocation[0]) <0.002 && Math.abs(location.longitude - polylineLocation[1]) <0.002){
                        cnt++;
                    }
                })
            });
            // console.log("end",Date.now());

            res(cnt*100/inputArr.length);//normalize the long distance with more/less polyline points 
        })
    }
}
