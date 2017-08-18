/**
 * Created by piyushgoel on 8/16/17.
 */
var app = require("../../express");
var placeReviewModel = require("../models/place-review.model.server");

app.post("/api/project/place/review", createReview);
app.delete("/api/project/place/review/:reviewId", deleteReview);
app.get("/api/project/place/review/:placeId", findReviewForPlace);

function createReview(req, res) {
    var review = req.body;
    placeReviewModel.createReview(review)
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}

function deleteReview(req, res) {
    var reviewId = req.params.reviewId;
    placeReviewModel.deleteReview(reviewId)
        .then(function (status) {
            res.send(status);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}

function findReviewForPlace(req, res) {
    var placeId = req.params.placeId;
    placeReviewModel.findReviewForPlace(placeId)
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}