const mongoose = require('mongoose');
// Define the rescues schema
const rescuesSchema = new mongoose.Schema({
 testID: { type: String},
 age_upon_outcome: { type: String},
 animal_id: { type: String, index: true  },
 animal_type: { type: String},
 breed: { type: String},
 color: { type: String },
 date_of_birth: { type: String},
 datetime: { type: String},
 monthyear: { type: String},
 name: { type: String},
 outcome_subtype: { type: String},
 outcome_type: { type: String},
 sex_upon_outcome: { type: String},
 location_lat: { type: Number},
 location_long: { type: Number},
 age_upon_outcome_in_weeks: { type: Number}
});
const Rescue = mongoose.model('rescues', rescuesSchema);
module.exports = Rescue;