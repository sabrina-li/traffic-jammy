import axios from "axios";

export default {
  // Gets all violations per state
  findAllViolationsForState: (state) => {
    state = state || "GA";
    return axios.get("/api/violation?State="+state);
  },
  //gets all violations
  getAllViolations: () => {
    return axios.get("/api/violation");
  },
  //gets all violations by lat and lng range
  findViolationsByLocation: (minLat,maxLat,minLon,maxLon) => {
    return axios.get("/api/violation?minLat="+minLat+"&minLon="+minLon+"&maxLat="+maxLat+"&maxLon="+maxLon);
  },



//   delete: function(id) {
//     return axios.delete("/api/"");
//   },

//   save: function(data) {
//     return axios.post("/api/");
//   }
};

