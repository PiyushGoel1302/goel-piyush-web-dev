/**
 * Created by piyushgoel on 7/28/17.
 */
var app = require("../../express");

var pages = [
    {
        _id: "321",
        name: "Post 1",
        websiteId: "456",
        description: "Lorem"
    },
    {
        _id: "432",
        name: "Post 2",
        websiteId: "456",
        description: "Lorem"
    },
    {
        _id: "543",
        name: "Post 3",
        websiteId: "456",
        description: "Lorem"
    }
];

app.get("/api/website/:websiteId/page", findPageByWebsite);
app.post("/api/website/:websiteId/page", createWebsite);
app.get("/api/page/:pageId", findPageById);
app.post("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function findPageByWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var pagename = req.query.pagename;
    if(websiteId && pagename) {
        for(var p in pages) {
            if(pages[p].websiteId === websiteId && pages[p].name === pagename) {
                res.send(pages[p].name);
                return;
            }
        }
    }
    else if(websiteId) {
        var _pages = [];
        for(var p in pages) {
            if(pages[p].websiteId === websiteId) {
                _pages.push(pages[p]);
            }
        }
        res.send(_pages);
        return;
    }
    res.send("0");
}

function createWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.websiteId = websiteId;
    pages.push(page);
    res.send("0");
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            res.send(pages[p]);
        }
    }
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            pages[p] = page;
            res.send(pages[p]);
            return;
        }
    }
    res.send("0")
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            delete pages[p];
        }
    }
    res.send("0");
}