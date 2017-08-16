/**
 * Created by piyushgoel on 8/8/17.
 */
var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.addToWishlist = addToWishlist;
userModel.removeFromWishlist = removeFromWishlist;
userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;

module.exports = userModel;

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel
        .findById(userId)
        .populate('wishlist', 'placeName')
        .populate('followers')
        .populate('following')
        .exec();
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {$set: user});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function addToWishlist(placeId, userId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.wishlist.push(placeId);
            return user.save();
        });
}

function removeFromWishlist(placeId, userId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.wishlist.indexOf(placeId);
            user.wishlist.splice(index, 1);
            return user.save();
        });
}

function followUser(userId, host) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.following.push(host._id);
            return user.save();
        })
        .then(function (response) {
            return userModel.findById(host._id)
                .then(function (host) {
                    host.followers.push(userId);
                    return host.save();
                });
        });
    // return userModel.update({_id: userId}, {$addToSet: {
    //     following: [hostId]
    // }})
    //     .then(function (status) {
    //         return userModel.update({_id: hostId}, {$addToSet: {
    //             followers: [userId]
    //         }});
    //     });
}

function unfollowUser(userId, host) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.following.indexOf(host._id);
            user.following.splice(index, 1);
            return user.save();
        })
        .then(function (response) {
            userModel.findById(host._id)
                .then(function (host) {
                    var index = host.followers.indexOf(userId);
                    host.followers.splice(index, 1);
                    return host.save();
                });
        });
}