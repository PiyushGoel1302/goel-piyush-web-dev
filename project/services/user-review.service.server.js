/**
 * Created by piyushgoel on 8/16/17.
 */
var app = require("../../express");
var userReviewModel = require("../models/user-review.model.server");

app.post("/api/project/review", createReview);
app.delete("/api/project/review/:reviewId", deleteReview);
app.delete("/api/project/reviewByUser/:userId", deleteReviewByUser);
app.get("/api/project/review/:userId", findReviewForUser);
app.get("/api/project/reviewBy/:userId", findReviewByUser);

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
    userReviewModel.deleteReview(reviewId)
        .then(function (status) {
            res.send(status);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}

function deleteReviewByUser(req, res) {
    var userId = req.params.userId;
    userReviewModel.deleteReviewByUser(userId)
        .then(function (status) {
            res.send(status);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}

function findReviewForUser(req, res) {
    var userId = req.params.userId;
    userReviewModel.findReviewForUser(userId)
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}

function findReviewByUser(req, res) {
    var userId = req.params.userId;
    userReviewModel.findReviewByUser(userId)
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}