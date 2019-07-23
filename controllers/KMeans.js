const db = require("../models");
var cluster = require('k-means');

const clusterUser =  (data,userMatrix) => {
    console.log("here",userMatrix)
    // console.log("here",data)

    return new Promise((res,rej)=>{//TODO: error handling
            var totalData = [];
        
            for (var i = 0; i < data.length; ++i) {
                var row = [];
                row.push(data[i].age|| 0);
                row.push(data[i].hispanic|| 0);
                row.push(data[i].race|| 0);
                row.push(data[i].sex|| 0);
                row.push(data[i].body|| 0);
                row.push(data[i].make|| 0);
                // row.push(data[i].model|| 0);//model number is based on make, TODO
                row.push(data[i].modelyr|| 0);
                row.push(data[i].feet || 0);
                row.push(data[i].weight || 0);
        
                // console.log(row);
                totalData.push(row);
            }
        
            var options = {
                clusters: 17, // number of clusters we want to cluster our data into. The default is 2. Sometimes, it is natural for one or more clusters to end up being excluded if they would not contain any data points.
                iterations: 1000 // number of iterations we want our k-means to run. The higher the number, the potentially more accurate, but it might take longer. The algorithm will cut off early if clusters stay perfectly consistent between iterations.
            }
        
            var finalResult = [];
            console.log("before",totalData,options);
            cluster(totalData, options, result => {
                console.log("after",result)
                const clusterID = result.finalMatrix?result.finalMatrix.shift()[0]:[];
                result.finalMatrix.forEach((element,idx) => {
                    if(element[0]===clusterID){
                        finalResult.push(data[idx])
                    }
                });
                console.log("after")
                res(finalResult);
            })
    })

   
}


module.exports = clusterUser;