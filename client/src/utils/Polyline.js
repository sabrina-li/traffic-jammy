//TODO: move this portion to server side
import polyline from '@mapbox/polyline';

// returns an array of lat, lon pairs from polyline6 by passing a precision parameter
export default {
    decode: input=>{
        return polyline.decode(input);
    }
}
