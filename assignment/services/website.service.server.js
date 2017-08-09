/**
 * Created by piyushgoel on 7/28/17.
 */
var app = require("../../express");
var websiteModel = require("../models/website.model.server");

// var websites = [
//     {
//         _id: "123",
//         name: "Facebook",
//         developerId: "456",
//         description: "Lorem"
//     },
//     {
//         _id: "234",
//         name: "Tweeter",
//         developerId: "456",
//         description: "Lorem"
//     },
//     {
//         _id: "456",
//         name: "Gizmodo",
//         developerId: "456",
//         description: "Lorem"
//     },
//     {
//         _id: "890",
//         name: "Go",
//         developerId: "123",
//         description: "Lorem"
//     },
//     {
//         _id: "567",
//         name: "Tic Tac Toe",
//         developerId: "123",
//         description: "Lorem"
//     },
//     {
//         _id: "678",
//         name: "Checkers",
//         developerId: "123",
//         description: "Lorem"
//     },
//     {
//         _id: "789",
//         name: "Chess",
//         developerId: "234",
//         description: "Lorem"
//     }
// ];

app.get("/api/user/:userId/website", findWebsitesByName);
app.post("/api/user/:userId/website", createWebsite);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);

function findWebsitesByName(req, res) {
    var name = req.query.websitename;
    var userId = req.params.userId;
    if(name && userId) {
        websiteModel
            .findWebsitesByName(name, userId)
            .then(function (website) {
                res.json(website);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            });
        // for(var w in websites) {
        //     if(websites[w].name === name && websites[w].developerId === userId) {
        //         res.send(websites[w]);
        //         return;
        //     }
        // }
    }
    else if(userId) {
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            });
        // var sites = [];
        // for(var w in websites) {
        //     if(websites[w].developerId === userId) {
        //         sites.push(websites[w]);
        //     }
        // }
        // res.send(sites);
        // return;
    }
}

function createWebsite(req, res) {
    var userId = req.params.userId;
    var website = req.body;
    websiteModel
        .createWebsite(userId, website)
        .then(function (website) {
            res.json(website);
        });
    // website._id = (new Date()).getTime() + "";
    // website.developerId = userId;
    // websites.push(website);
    // res.send(website);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        });
    // for(var w in websites) {
    //     if(websites[w]._id === websiteId) {
    //         res.send(websites[w]);
    //     }
    // }
}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params.websiteId;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var w in websites) {
    //     if(websites[w]._id === websiteId) {
    //         websites[w] = website;
    //         res.send(websites[w]);
    //         return;
    //     }
    // }
    // res.send("0");
}

function deleteWebsite(req, res) {
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(userId, websiteId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var w in websites) {
    //     if(websites[w]._id === websiteId) {
    //         delete websites[w];
    //     }
    // }
    // res.send("0");
}