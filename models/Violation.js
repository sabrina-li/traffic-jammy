const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const violationSchema = new Schema({

    date_of_stop: { type: String, required: true },
    description: { type: String, required: true },
    location: String,
    latitude: { type:Number, default: 0 },
    longitude: { type:Number, default: 0 },
    state: { type:String },
    hispanic:{type:Number},
    race:{type:Number},
  city: {type:Number},
  accday: {type:Number},
  acchr: {type:Number},
  accmon: {type:Number},
  dayofweek: {type:Number},
  age: {type:Number},
  hispanic: {type:Number},
  ptype: {type:Number},
  race: {type:Number},
  sex: {type:Number},
  body: {type:Number},
  make: {type:Number},
  model: {type:Number},
  modelyr: {type:Number},
  feet: {type:Number},
  weight: {type:Number}
});

const Violation = mongoose.model("Violation", violationSchema);

module.exports = Violation;
