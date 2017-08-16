/**
 * Created by piyushgoel on 8/14/17.
 */
var mongoose = require("mongoose");
var placeSchema = require("./place.schema.server");
var placeModel = mongoose.model("PlaceModel", placeSchema);

placeModel.checkFollower = checkFollower;
placeModel.checkHost = checkHost;
placeModel.addFollower = addFollower;
placeModel.addHost = addHost;
placeModel.removeFollower = removeFollower;
placeModel.removeHost = removeHost;
placeModel.findByName = findByName;

module.exports = placeModel;
var userModel = require("./user.model.server");

function checkFollower(placeName, userId) {
    return placeModel.findOne({placeName: placeName, followers: userId});
}

function checkHost(placeName, userId) {
    return placeModel.findOne({placeName: placeName, hosts: userId});
}

function addFollower(placeName, userId) {
    var placeTmp = null;
    return placeModel.findByName(placeName)
        .then(function (place) {
            if(place === null) {
                return placeModel.create({placeName: placeName, followers: [userId]})
                    .then(function (place) {
                        placeTmp = place;
                        return userModel.addToWishlist(place._id, userId);
                    })
                    .then(function (userDoc) {
                        return placeTmp;
                    });
            } else {
                return placeModel.update({placeName: place.placeName}, {$push: {
                    followers: userId
                }})
                    .then(function (status) {
                        return userModel.addToWishlist(place._id, userId);
                    })
                    .then(function (userDoc) {
                        return placeTmp;
                    });
            }
        });
}

function addHost(placeName, userId) {
    var placeTmp = null;
    return placeModel.findByName(placeName)
        .then(function (place) {
            if(place === null) {
                return placeModel.create({placeName: placeName, hosts: [userId]})
                    .then(function (place) {
                        placeTmp = place;
                        return userModel.addToWishlist(place._id, userId);
                    })
                    .then(function (userDoc) {
                        return placeTmp;
                    });
            } else {
                return placeModel.update({placeName: place.placeName}, {$push: {
                    hosts: userId
                }})
                    .then(function (status) {
                        return userModel.addToWishlist(place._id, userId);
                    })
                    .then(function (userDoc) {
                        return placeTmp;
                    });
            }
        });
}

function findByName(placeName) {
    return placeModel.findOne({placeName: placeName})
        .populate('hosts')
        .populate('followers')
        .exec();
}

function removeFollower(placeName, userId) {
    return placeModel
        .findByName(placeName)
        .then(function (place) {
            var index = place.followers.indexOf(userId);
            place.followers.splice(index, 1);
            return place.save();
        })
        .then(function (place) {
            return userModel.removeFromWishlist(place._id, userId);
        });
}

function removeHost(placeName, userId) {
    return placeModel
        .findByName(placeName)
        .then(function (place) {
            var index = place.hosts.indexOf(userId);
            place.hosts.splice(index, 1);
            return place.save();
        })
        .then(function (place) {
            return userModel.removeFromWishlist(place._id, userId);
        });
}