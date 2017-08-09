/**
 * Created by piyushgoel on 7/28/17.
 */
var app = require("../../express");
var pageModel = require("../models/page.model.server");

// var pages = [
//     {
//         _id: "321",
//         name: "Post 1",
//         websiteId: "456",
//         description: "Lorem"
//     },
//     {
//         _id: "432",
//         name: "Post 2",
//         websiteId: "456",
//         description: "Lorem"
//     },
//     {
//         _id: "543",
//         name: "Post 3",
//         websiteId: "456",
//         description: "Lorem"
//     }
// ];

app.get("/api/website/:websiteId/page", findPageByWebsite);
app.post("/api/website/:websiteId/page", createWebsite);
app.get("/api/page/:pageId", findPageById);
app.post("/api/page/:pageId", updatePage);
app.delete("/api/website/:websiteId/page/:pageId", deletePage);

function findPageByWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var pagename = req.query.pagename;
    if(websiteId && pagename) {
        pageModel
            .findPageByWebsite(pagename, websiteId)
            .then(function (page) {
                res.json(page);
                return;
            });
        // for(var p in pages) {
        //     if(pages[p].websiteId === websiteId && pages[p].name === pagename) {
        //         res.send(pages[p].name);
        //         return;
        //     }
        // }
    }
    else if(websiteId) {
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            });
        // var _pages = [];
        // for(var p in pages) {
        //     if(pages[p].websiteId === websiteId) {
        //         _pages.push(pages[p]);
        //     }
        // }
        // res.send(_pages);
        // return;
    }
}

function createWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
    // page._id = (new Date()).getTime() + "";
    // page.websiteId = websiteId;
    // pages.push(page);
    // res.send("0");
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
    // for(var p in pages) {
    //     if(pages[p]._id === pageId) {
    //         res.send(pages[p]);
    //     }
    // }
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var p in pages) {
    //     if(pages[p]._id === pageId) {
    //         pages[p] = page;
    //         res.send(pages[p]);
    //         return;
    //     }
    // }
    // res.send("0")
}

function deletePage(req, res) {
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    pageModel
        .deletePage(websiteId, pageId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var p in pages) {
    //     if(pages[p]._id === pageId) {
    //         delete pages[p];
    //     }
    // }
    // res.send("0");
}