const mongoose = require('mongoose');
const Rescue = require('../models/rescues'); //Register model
const Users = require('../models/users');
const Model = mongoose.model('rescues');
const User = mongoose.model('users');

// Get: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const rescuesList = async(req, res) => {
    console.log("in rescues list");
    const q = await Model.find({}) // No filter, return all records
    .exec();

    // Uncomment the following line to show results of querey
    // on the console
    // console.log(q);
    
    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        console.log('Resuce list sent out');
        return res
                .status(200)
                .json(q);   
    }

};

// Get: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const rescuesFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.ID }) // Return a single record
        .exec();

    // Uncomment the following line to show results of querey
    // on the console
    // console.log(q);
    
    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);   
    }

};

// Post: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to requesting client 
const rescuesAddRescue = async(req, res) => {
    if(getUser(req, res).status == 201);

    let currentDate = new Date();

    const newRescue = new Rescue({
        ID: req.body.ID,
        age_upon_outcome: req.body.age_upon_outcome,
        animal_id: req.body.animal_id,
        animal_type: req.body.animal_type,
        breed: req.body.breed,
        color: req.body.color,
        date_of_birth: req.body.date_of_birth,
        datetime: currentDate.toString(),
        monthyear: currentDate.toString(),
        name: req.body.name,
        outcome_subtype: req.body.outcome_subtype,
        outcome_type: req.body.outcome_type,
        sex_upon_outcome: req.body.sex_upon_outcome,
        location_lat: req.body.location_lat,
        location_long: req.body.location_long,
        age_upon_outcome_in_weeks: req.body.age_upon_outcome_in_weeks
    });

    const q = await newRescue.save();

        if(!q)
        {// Database returned no data
            return res
                .status(400)
                .json(err);
        }else{// Return new trip
            return res
                .status(201);
        }

        // Uncomment the following line to show results of operation
        // on console
        // console.log(q);
};

//PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const rescuesUpdateRescue = async(req, res) => {
    
    // Uncomment for Debugging
    //console.log(req.params);
    //console.log(req.body);
    if(getUser(req, res).status == 201);
            console.log("made it into update")
    const q = await Model
        .findOneAndUpdate(
            {'code': req.params.ID},
            {
                ID: req.body.ID,
                age_upon_outcome: req.body.age_upon_outcome,
                animal_id: req.body.animal_id,
                animal_type: req.body.animal_type,
                breed: req.body.breed,
                color: req.body.color,
                date_of_birth: req.body.date_of_birth,
                datetime: req.body.datetime,
                monthyear: req.body.monthyear,
                name: req.body.name,
                outcome_subtype: req.body.outcome_subtype,
                outcome_type: req.body.outcome_type,
                sex_upon_outcome: req.body.sex_upon_outcome,
                location_lat: req.body.location_lat,
                location_long: req.body.location_long,
                age_upon_outcome_in_weeks: req.body.age_upon_outcome_in_weeks
            }
        )
        .exec();

        if(!q)
            {//Database returns no data
                return res
                    .status(400)
                    .json(err);
            }else{//Return resulting updated trip
                return res
                    .status(201);
            }

            //Uncomment the following line to show results of operation
            //on the console
            //console.log(q);
};

const rescuesDeleteRescue = async(req, res) => {
    
    // Uncomment for Debugging
    //console.log(req.params);
    //console.log(req.body);
    if(getUser(req, res).status == 201);
            
    const q = await Model
        .findOneAndDelete(
            {'code': req.params.ID}
        )
        .exec();

        if(!q)
            {//Database returns no data
                return res
                    .status(400)
                    .json(err);
            }else{//Return resulting updated trip
                return res
                    .status(201);
            }

            //Uncomment the following line to show results of operation
            //on the console
            //console.log(q);
};

const getUser = async(req, res) => {
    if(req.authorization && req.authorization.email) {
        const q = await User
            .findOne({ 'email': req.authorization.email })
            .exec();
            console.log('Got past mongoose in getUser');
            if (!q) {
                console.log('user not found');
                return res
                    .status(404)
                    .json({"message": "User not found"});
            } else {
                 return res
                .status(201)
                .json(q.name);
            }
    } else {
        return res
            .status(404)
            .json({"message": "User not found"});
    }
};

module.exports = {
    rescuesList,
    rescuesFindByCode,
    rescuesAddRescue,
    rescuesUpdateRescue,
    rescuesDeleteRescue
};