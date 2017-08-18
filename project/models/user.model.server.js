/**
 * Created by piyushgoel on 8/8/17.
 */
var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModelProject", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
// userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.addToWishlist = addToWishlist;
userModel.removeFromWishlist = removeFromWishlist;
userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;
userModel.addReviewToList = addReviewToList;
userModel.removeReviewFromList = removeReviewFromList;
userModel.removeFromFollowersList = removeFromFollowersList;
userModel.removeFromFollowingList = removeFromFollowingList;
userModel.findAllUsers = findAllUsers;

module.exports = userModel;
var placeModel = require("./place.model.server");

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
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
        .populate('reviews')
        .exec();
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {$set: user});
}

function deleteUser(userId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            return userModel.remove({_id: user._id})
                .then(function (response) {
                    return userModel
                        .find()
                        .then(function (response) {
                            return response.forEach(function (value) {
                                if(user.role === 'Traveller') {
                                    var index = value.followers.indexOf(userId);
                                    value.followers.splice(index, 1);
                                } else if(user.role === 'Host') {
                                    var index2 = value.following.indexOf(userId);
                                    value.following.splice(index2, 1);
                                }
                                return value.save()
                                    .then(function (response) {
                                        return placeModel.deleteUserFromPlaces(user);
                                    });
                            });
                        });
                });
        });
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

function addReviewToList(review) {
    return userModel.findUserById(review._user)
        .then(function (user) {
            user.reviews.push(review._id);
            return user.save();
        })
}

function removeReviewFromList(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.reviews.indexOf(reviewId);
            user.reviews.splice(index, 1);
            return user.save();
        });
}

function removeFromFollowersList(userId, followerId) {
    return userModel.findById(followerId)
        .then(function (user) {
            var index = user.following.indexOf(userId);
            user.following.splice(index, 1);
            return user.save();
        });
}

function removeFromFollowingList(userId, followingId) {
    return userModel.findById(followingId)
        .then(function (user) {
            var index = user.followers.indexOf(userId);
            user.followers.splice(index, 1);
            return user.save();
        });
}

function findAllUsers() {
    return userModel.find();
}