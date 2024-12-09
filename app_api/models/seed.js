const mongoose = require('./db');
const Rescue = require('./rescues');

// Read seed data from json file
var fs = require('fs');
var rescues = JSON.parse(fs.readFileSync('./search_page/src/app/data/rescues.json', 'utf8'));
console.log(rescues);
// delete any existing records, then insert seed data
const seedDB = async () => {
    await Rescue.deleteMany({});
    await Rescue.insertMany(rescues);
};
//Close the mongoDB connection and exit
seedDB().then(async () =>{
    await mongoose.connection.close();
    process.exit(0);
});