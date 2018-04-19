'use strict';
const User = require('./../models/user');

class UserController{
    signup(user){
        let data = Object.assign(new User(), user);
        return data.save();
        // return User.findOne({email:user.email})
        // .then((existUser) => {
        //     if(existUser){
        //         let data = Object.assign(existUser, user)
        //     }
        //     else{
        //         let data = Object.assign(new User(), user)
        //     }
        //     return data.save()
        // })
    }

    getUser(email){
        return User.findOne({email})
    }
}

module.exports = UserController