const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/users');

const register = async(req, res) => {

    //console.log('in register');
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }

    //Fills in user data to create user object
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    //Calls setpassword to obscure saved password
    user.setPassword(req.body.password);
    //makes async call to save user to the database and then generate the JWT token for session authorization.
    const q = await user.save();
        if (!q) {
            res
                .status(400)
                .json(err);
        } else {
            const token = user.generateJWT();
            res
                .status(200)
                .json({token});
        }
};

//Login will compare supplied user with user database and create a new JWT token if use authenticates
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res
                .status(404)
                .json(err);
        }
        if (user) {
            const token = user.generateJWT();

            res
                .status(200)
                .json({token});
        } else {
            res
                .status(401)
                .json(info);
        }
    }) (req, res);
};

module.exports = {
    register,
    login
};
