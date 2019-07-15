//TODO: move this portion to server side
import polyline from '@mapbox/polyline';

// returns an array of lat, lon pairs from polyline6 by passing a precision parameter
export default {
    decode: input=>{
        return polyline.decode(input);
    },
    predict:(inputArr,dataArr)=>{
        console.log("start",Date.now());
        return new Promise((res,rej)=>{
            let cnt = 0;
            console.log(dataArr[0]);
            console.log(inputArr[0])
            dataArr.forEach(location => {
                inputArr.forEach(polylineLocation=>{
                    if(Math.abs(location.latitude - polylineLocation[0]) <0.0005 && Math.abs(location.longitude - polylineLocation[1]) <0.0005){
                        cnt++;
                        
                    }
                })
            });
            console.log("end",Date.now());
            res(cnt);
        })
    }
}
