/**
 * Created by piyushgoel on 8/16/17.
 */
var mongoose = require("mongoose");
var userReviewSchema = require("./user-review.schema.server");
var userReviewModel = mongoose.model("UserReviewModel", userReviewSchema);

userReviewModel.createReview = createReview;
userReviewModel.deleteReview = deleteReview;
userReviewModel.deleteReviewByUser = deleteReviewByUser;
userReviewModel.findReviewForUser = findReviewForUser;
userReviewModel.findReviewByUser = findReviewByUser;

module.exports = userReviewModel;

// var userModel = require("./user.model.server");

function createReview(review) {
    return userReviewModel.create(review);
}

function deleteReview(reviewId) {
    return userReviewModel.remove({_id: reviewId});
}

function deleteReviewByUser(userId) {
    return userReviewModel.remove({reviewer: userId})
        .then(function (response) {
            return userReviewModel.remove({_user: userId});
        });
}

function findReviewForUser(userId) {
    return userReviewModel.find({_user: userId})
        .populate('_user')
        .populate('reviewer')
        .exec();
}

function findReviewByUser(userId) {
    return userReviewModel.find({reviewer: userId})
        .populate('_user')
        .populate('reviewer')
        .exec();
}