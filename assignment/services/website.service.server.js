/**
 * Created by piyushgoel on 7/28/17.
 */
var app = require("../../express");

var websites = [
    {
        _id: "123",
        name: "Facebook",
        developerId: "456",
        description: "Lorem"
    },
    {
        _id: "234",
        name: "Tweeter",
        developerId: "456",
        description: "Lorem"
    },
    {
        _id: "456",
        name: "Gizmodo",
        developerId: "456",
        description: "Lorem"
    },
    {
        _id: "890",
        name: "Go",
        developerId: "123",
        description: "Lorem"
    },
    {
        _id: "567",
        name: "Tic Tac Toe",
        developerId: "123",
        description: "Lorem"
    },
    {
        _id: "678",
        name: "Checkers",
        developerId: "123",
        description: "Lorem"
    },
    {
        _id: "789",
        name: "Chess",
        developerId: "234",
        description: "Lorem"
    }
];

app.get("/api/user/:userId/website", findWebsitesByName);
app.post("/api/user/:userId/website", createWebsite);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);

function findWebsitesByName(req, res) {
    var name = req.query.websitename;
    var userId = req.params.userId;
    if(name && userId) {
        for(var w in websites) {
            if(websites[w].name === name && websites[w].developerId === userId) {
                res.send(websites[w]);
                return;
            }
        }
    }
    else if(userId) {
        var sites = [];
        for(var w in websites) {
            if(websites[w].developerId === userId) {
                sites.push(websites[w]);
            }
        }
        res.send(sites);
        return;
    }
    res.send("0");
}

function createWebsite(req, res) {
    var userId = req.params.userId;
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    websites.push(website);
    res.send(website);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            res.send(websites[w]);
        }
    }
}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params.websiteId;
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            websites[w] = website;
            res.send(websites[w]);
            return;
        }
    }
    res.send("0");
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    for(var w in websites) {
        if(websites[w]._id === websiteId) {
            delete websites[w];
        }
    }
    res.send("0");
}