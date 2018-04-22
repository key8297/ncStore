'use strict';
var q = require('q');
var Division = require('./../models/division');
const User = require('./../models/user');

const getNewDivisionNumber = () => {
    let deferred = q.defer();

    Division.find({},null,{sort: {'id': -1}}).limit(1)
        .then(division => {
            if (division.length == 0)
                deferred.resolve(1)
            else
                deferred.resolve(division[0].id + 1);
        });

    return deferred.promise;
}

class DivisionController {
    create(division) {
        let deferred = q.defer();

        let data = Object.assign(new Division(), division);
        data.save()
        .then(division => {
            User.findOne({email:division.contact})
            .then(user => {
                if(user && !user.mainDivision){
                    user.mainDivision = division._id;                            
                }
                user.divisions.push(division._id);
                user.save();
            })

            deferred.resolve(division);
        });

        return deferred.promise;
    }

    retrieve(id){
        let deferred = q.defer();
        console.log(`[Retrieve Division] --  ${id}`);

        Division.findOne({ _id :id })
            .then((division) => {
                if (!division) {
                    deferred.reject(`[Retrieve Division] not found. ${id}`);
                }
                else {
                    deferred.resolve(division);
                }
            });

        return deferred.promise;
    }

    remove(id) {
        let deferred = q.defer();

        Division.findOne({ id })
            .then((division) => {
                if (!division) {
                    deferred.reject(`[Delete Division] not found. ${id}`);
                }
                else {
                    division.remove()
                        .then(() => deferred.resolve(`[Delete division] succeed. ${id}`))
                }
            });

        return deferred.promise;
    }
}

module.exports = DivisionController