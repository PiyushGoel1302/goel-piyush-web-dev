/**
 * Created by piyushgoel on 8/16/17.
 */
var mongoose = require("mongoose");
var placeReviewSchema = require("./place-review.schema.server");
var placeReviewModel = mongoose.model("PlaceReviewModel", placeReviewSchema);

placeReviewModel.createReview = createReview;
placeReviewModel.deleteReview = deleteReview;
placeReviewModel.findReviewForPlace = findReviewForPlace;

module.exports = placeReviewModel;

function createReview(review) {
    return placeReviewModel.create(review);
}

function deleteReview(reviewId) {
    return placeReviewModel.remove({_id: reviewId});
}

function findReviewForPlace(placeId) {
    return placeReviewModel.find({_place: placeId})
        .populate('_place')
        .populate('reviewer')
        .exec();
}