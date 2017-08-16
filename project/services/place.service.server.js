/**
 * Created by piyushgoel on 8/14/17.
 */
var app = require("../../express");
var placeModel = require("../models/place.model.server");

app.get("/api/place/:placeName/user",  checkFollower);
app.post("/api/place/add/:placeName", addFollower);
app.post("/api/place/remove/:placeName", removeFollower);
app.get("/api/placeHost/:placeName", searchHost);

function checkFollower(req, res) {
    var placeName = req.params.placeName;
    var userId = req.query.userId;
    var userRole = req.query.userRole;
    if(userRole === "Traveller") {
        placeModel.checkFollower(placeName, userId)
            .then(function (response) {
                res.json(response);
                return;
            }, function (err) {
                res.send(err);
                return;
            });
    } else if(userRole === "Host") {
        placeModel.checkHost(placeName, userId)
            .then(function (response) {
                res.json(response);
                return;
            }, function (err) {
                res.send(err);
                return;
            });
    }
}

function addFollower(req, res) {
    var placeName = req.params.placeName;
    var user = req.body;
    if(user.role === "Traveller") {
        placeModel.addFollower(placeName, user._id)
            .then(function (response) {
                res.json(response);
                return;
            }, function (err) {
                res.json(err);
                return;
            });
    } else if(user.role === "Host") {
        placeModel.addHost(placeName, user._id)
            .then(function (response) {
                res.json(response);
                return;
            }, function (err) {
                res.json(err);
                return;
            });
    }
}

function removeFollower(req, res) {
    var placeName = req.params.placeName;
    var user = req.body;
    if(user.role === "Traveller") {
        placeModel.removeFollower(placeName, user._id)
            .then(function (response) {
                res.json(response);
                return;
            }, function (err) {
                res.json(err);
                return;
            });
    } else if(user.role === "Host") {
        placeModel.removeHost(placeName, user._id)
            .then(function (response) {
                res.json(response);
                return;
            }, function (err) {
                res.json(err);
                return;
            });
    }
}

function searchHost(req, res) {
    var placeName = req.params.placeName;
    placeModel.findByName(placeName)
        .then(function (place) {
            res.json(place);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}