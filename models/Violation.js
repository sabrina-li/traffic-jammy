const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const violationSchema = new Schema({

    date_of_stop: { type: String, required: true },
    description: { type: String, required: true },
    location: String,
    latitude: { type:Number, default: 0 },
    longitude: { type:Number, default: 0 },
    state: { type:String }
});

const Violation = mongoose.model("Violation", violationSchema);

module.exports = Violation;
