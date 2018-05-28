'use strict';
const q = require('q');
const User = require('./../models/user');
const auth = require('../auth/auth');

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
                .then(user => {
                    let token = auth.sign({
                        name: user.name,
                        email: user.email
                    });
                    deferred.resolve({token});
                });
            }
        });
        return deferred.promise;
    }

    login(email, password){
        let deferred = q.defer();
        User.findOne({email, password})
        .then((user) => {
            if(user){
                if(user.password === password){
                    let token = auth.sign({
                        name: user.name,
                        email: user.email
                    });
                    deferred.resolve({token});
                }
                else{
                    deferred.reject('Invalid password');    
                }
            }
            else {
                deferred.reject(`User not found`);
            }
        });
        
        return deferred.promise;
    }
}

module.exports = UserController