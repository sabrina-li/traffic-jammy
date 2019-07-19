const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trafficdb", { useNewUrlParser: true })

const db = require("../../../models");
var cluster = require('k-means');



db.Violation.find({}).then(iris=>{

     var trainingDataSize = Math.round(iris.length * 0.9);
     var trainingData = [];
     var testingData = [];
     
     for(var i=0; i < iris.length ; ++i) {
        var row = [];
        row.push(iris[i].age);
        row.push(iris[i].hispanic);
        row.push(iris[i].race);
        row.push(iris[i].sex);
        row.push(iris[i].body);
        row.push(iris[i].make);
        row.push(iris[i].model);
        row.push(iris[i].modelyr);
        row.push(iris[i].feet||0);
        row.push(iris[i].weight||0);

        if(i < trainingDataSize){
            trainingData.push(row);
        } else {
            testingData.push(row);
        }
     }
     var options = {
        clusters: 10, // number of clusters we want to cluster our data into. The default is 2. Sometimes, it is natural for one or more clusters to end up being excluded if they would not contain any data points.
        iterations: 10 // number of iterations we want our k-means to run. The higher the number, the potentially more accurate, but it might take longer. The algorithm will cut off early if clusters stay perfectly consistent between iterations.
      }

     cluster(trainingData,options,result=>{
         console.log("result");
         console.log(result.finalMatrix);
         console.log("end");
     })
})