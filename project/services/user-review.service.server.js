/**
 * Created by piyushgoel on 8/16/17.
 */
var app = require("../../express");
var userReviewModel = require("../models/user-review.model.server");

app.post("/api/project/review", createReview);
app.delete("/api/project/review/:reviewId/user/:userId", deleteReview);

function createReview(req, res) {
    var review = req.body;
    userReviewModel.createReview(review)
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
    var userId = req.params.userId;
    userReviewModel.deleteReview(reviewId, userId)
        .then(function (status) {
            res.send(status);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}