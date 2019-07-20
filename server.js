const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    // console.log("production!")
    // app.use(express.static("client/build"));
    // Serve static files from the React frontend app
    app.use(express.static(path.join(__dirname, 'client/build')))
    // Anything that doesn't match the above, send back index.html
    app.get('*', (req, res) => {
        console.log(process.env.NODE_ENV );
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
    })
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trafficdb",{useNewUrlParser: true})

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==" API Server now listening on PORT ${PORT}!`);
});


