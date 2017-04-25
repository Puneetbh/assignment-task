'use strict';

import User from './../custom_modules/users/models/users.js';
import mongoose from 'mongoose';
let LocalStrategy = require('passport-local').Strategy;
    //User = mongoose.model('User');
    //config = require('./config');



module.exports = function(passport) {
console.log("Attempted Login: ");
    // Serialize the user id to push into the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize the user object based on a pre-serialized token
    // which is the user id
    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, '-salt -hashed_password', function(err, user) {
            done(err, user);
        });
    });

    // Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            console.log("Attempted Login: " + email + " password: "+ password);


            //console.log("Attempted Login: " + password);
            User.findOne({
                email: email
            }, function(err, user) {
                console.log("User data: ", user );

                //console.log("User valid passwordL: " + user.validPassword(password));


                var genericErrorMessage = "Email & Password do not match";
                if (err) {
                    console.log("err: "+ err);
                    return done(err);
                }
                if (!user) {
                    console.log("!user: Unknown user");
                    return done(null, false, {
                        status: -1,
                        // generic "No!"
                        message: genericErrorMessage
                    });
                }
                if (password !== user.password) {
                    console.log("!user.authenticate(password): Invalid Password");
                    return done(null, false, {
                        status: -2,
                        // generic "No!"
                        message: genericErrorMessage
                    });
                }

                console.log("login: " + email + " successfull!");
                return done(null, user);
            });
        }
    ));

};
