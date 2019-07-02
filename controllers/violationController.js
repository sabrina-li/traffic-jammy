const db = require("../models");
// Defining methods for the Controller
module.exports = {
  findAllViolationsForState: (req, res) => {
    //TODO: add year
    db.Violation
      .find(req.query,['Latitude', 'Longitude'])  
      .limit(10000)    //MAX 10k records
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findViolationsByLocation: (req, res) => {
      const query = {
        $and: [
            {Latitude: {$gt : req.query.minLat, $lt : req.query.maxLat}},
            {Longitude: {$gt : req.query.minLon, $lt : req.query.maxLon}}
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