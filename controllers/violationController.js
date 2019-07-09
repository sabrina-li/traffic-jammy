const db = require("../models");
// Defining methods for the Controller
module.exports = {
  //api/violation?State=GA
  findAllViolationsForState: (req, res) => {
    //TODO: add year
    db.Violation
      .find(req.query,['latitude', 'longitude'])  
      .limit(10000)    //MAX 10k records
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //api/violation/geolocation
  findViolationsByLocation: (req, res) => {
    console.log(req.query)
      const query = {
        $and: [
            {latitude: {$gt : req.query.minLat, $lt : req.query.maxLat}},
            {longitude: {$gt : req.query.minLon, $lt : req.query.maxLon}}
        ]
    }
    db.Violation
      .findById(query)
      .limit(10000) 
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
//   create: function(req, res) {
//     db.Book
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   update: function(req, res) {
//     db.Book
//       .findOneAndUpdate({ _id: req.params.id }, req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   remove: function(req, res) {
//     db.Book
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
};