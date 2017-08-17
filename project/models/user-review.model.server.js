/**
 * Created by piyushgoel on 8/16/17.
 */
var mongoose = require("mongoose");
var userReviewSchema = require("./user-review.schema.server");
var userReviewModel = mongoose.model("UserReviewModel", userReviewSchema);

userReviewModel.createReview = createReview;
userReviewModel.deleteReview = deleteReview;

module.exports = userReviewModel;

var userModel = require("./user.model.server");

function createReview(review) {
    return userReviewModel.create(review)
        .then(function (review) {
            return userModel.addReviewToList(review);
        });
}

function deleteReview(reviewId, userId) {
    return userReviewModel.remove(reviewId)
        .then(function (response) {
            return userModel.removeReviewFromList(userId, reviewId);
        })
}