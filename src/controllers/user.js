'use strict';
var q = require('q');
const User = require('./../models/user');

class UserController{
    signup(user){
        let deffered = q.defer();
        User.findOne({email:user.email})
        .then((existinguser) => {
            if(existinguser){
                deffered.reject("Record already exists.");
            }
            else{
                let data = Object.assign(new User(), user);
                data.save()
                .then((user) => deffered.resolve(user));
            }
        });
        return deffered.promise;
    }

    login(email){
        let deffered = q.defer();
        User.findOne({email})
        .then((user) => {
            if(user){
                deffered.resolve(user);
            }
            else {
                deffered.reject(`${email} : user not found.`);
            }
        });
        
        return deffered.promise;
    }
}

module.exports = UserController