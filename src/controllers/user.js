'use strict';
var q = require('q');
const User = require('./../models/user');

class UserController{

    signup(user){
        let deferred = q.defer();
        User.findOne({email:user.email})
        .then((existinguser) => {
            if(existinguser){
                deferred.reject("Record already exists.");
            }
            else{
                let data = Object.assign(new User(), user);
                data.save()
                .then((user) => deferred.resolve(user));
            }
        });
        return deferred.promise;
    }

    login(email, password){
        let deferred = q.defer();
        User.findOne({email, password})
        .then((user) => {
            if(user){
                deferred.resolve(user);
            }
            else {
                deferred.reject(`${email} : user not found.`);
            }
        });
        
        return deferred.promise;
    }
}

module.exports = UserController