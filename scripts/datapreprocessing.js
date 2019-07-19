



const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trafficdb", { useNewUrlParser: true })

const db = require("../models");


const hispanic = {
    "-1": "Blank",
    "0": "Not Applicable",
    "1": "Mexican",
    "2": "Puerto Rican",
    "3": "Cuban",
    "4": "Central or South American",
    "5": "European Spanish",
    "6": "Hispanic, Origin Not Specified or Other Origin",
    "7": "Non-Hispanic",
    "99": "Unknown",
}


const race = {
    "-1": "Blank"
    , "0": "Not Applicable"
    , "1": "White"
    , "2": "Black"
    , "3": "American Indian (includes Alaska Native)"
    , "4": "Chinese"
    , "5": "Japanese"
    , "6": "Hawaiian (includes Part-Hawaiian)"
    , "7": "Filipino"
    , "18": "Asian Indian"
    , "19": "Other Indian (includes South and Central America, any other, except American or Asian Indians)"
    , "28": "Korean"
    , "38": "Samoan"
    , "48": "Vietnamese"
    , "58": "Guamanian"
    , "68": "Other Asian or Pacific Islander"
    , "78": "Asian or Pacific Islander, no specific (individual) race"
    , "97": "Multiple Races (individual races not specified; ex. \"mixed\")"
    , "98": "All other races"
    , "99": "Unknown"
}

const sex = {
    "-1": "Blank",
    "1": "Male",
    "2": "Female",
    "8": "Not Reported",
    "9": "Unknown"
}


// const a = async () => {
//     for (var key in hispanic) {
//         key = parseInt(key);
//         await db.Violation.updateMany({ hispanic: hispanic[key] }, { $set: { hispanic: key } })
//     }
// }


// a();