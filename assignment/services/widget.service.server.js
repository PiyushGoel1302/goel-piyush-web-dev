/**
 * Created by piyushgoel on 7/28/17.
 */
var app = require("../../express");
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });
var widgetModel = require("../models/widget.model.server");

// var widgets = [
//     {
//         _id: "123",
//         widgetType: "HEADING",
//         pageId: "321",
//         size: 2,
//         text: "GIZMODO"
//     },
//     {
//         _id: "234",
//         widgetType: "HEADING",
//         pageId: "321",
//         size: 4,
//         text: "Lorem ipsum"
//     },
//     {
//         _id: "345",
//         widgetType: "IMAGE",
//         pageId: "321",
//         width: "100%",
//         url: "http://lorempixel.com/400/200/"
//     },
//     {
//         _id: "456",
//         widgetType: "HTML",
//         pageId: "321",
//         text: "<p>Lorem ipsum</p>"
//     },
//     {
//         _id: "567",
//         widgetType: "HEADING",
//         pageId: "321",
//         size: 4,
//         text: "Lorem ipsum"
//     },
//     {
//         _id: "678",
//         widgetType: "YOUTUBE",
//         pageId: "321",
//         width: "100%",
//         url: "https://youtu.be/AM2Ivdi9c4E"
//     },
//     {
//         _id: "789",
//         widgetType: "HTML",
//         pageId: "321",
//         text: "<p>Lorem ipsum</p>"
//     }
// ];

app.get("/api/page/:pageId/widget", findWidgetsByPageId);
app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/page/:pageId/widget/:widgetId", deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/api/page/:pageId/widget", updateWidgetIndex);

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;
    widgetModel
        .findAllPWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
    // var _widgets = [];
    // for(var w in widgets) {
    //     if(widgets[w].pageId === pageId) {
    //         _widgets.push(widgets[w]);
    //     }
    // }
    // res.send(_widgets);
}

function createWidget(req, res) {
    var pageId = req.params.pageId;
    var widget = req.body;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        });
    // widget._id = (new Date()).getTime() + "";
    // widget.pageId = pageId;
    // widgets.push(widget);
    // res.send(widget._id);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
    // for(var w in widgets) {
    //     if(widgets[w]._id === widgetId) {
    //         res.send(widgets[w]);
    //     }
    // }
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var w in widgets) {
    //     if(widgets[w]._id === widgetId) {
    //         widgets[w] = widget;
    //         res.send(widgets[w]);
    //         return;
    //     }
    // }
    // res.send("0");
}

function deleteWidget(req, res) {
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;
    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var w in widgets) {
    //     if(widgets[w]._id === widgetId) {
    //         delete widgets[w];
    //     }
    // }
    // res.send("0");
}

// function getWidgetById(widgetId) {
//     widgetModel.findWidgetById(widgetId)
//         .then(function (widget) {
//             return widget;
//         }, function (err) {
//             return null;
//         });
//     // for(var w in widgets){
//     //     if(widgets[w]._id === widgetId){
//     //         return widgets[w];
//     //     }
//     // }
//     // return null;
// }

function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    // var widget = getWidgetById(widgetId);
    var widget = null;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (response) {
            widget = response;
            widget.url = '/uploads/'+filename;
            widgetModel
                .updateWidget(widgetId, widget)
                .then(function (widget) {
                    console.log(widget);
                });
        });

    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    res.redirect(callbackUrl);
}

function updateWidgetIndex(req, res) {
    var pageId = req.params.pageId;
    var startIndex = req.query.initial;
    var endIndex = req.query.final;
    widgetModel.reorderWidget(pageId, startIndex, endIndex)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // var _widgets = [];
    // for(var w in widgets){
    //     if(widgets[w].pageId === pageId){
    //         _widgets.push(widgets[w]);
    //     }
    // }
    // for (var i = widgets.length - 1 ; i >= 0 ; i--) {
    //     if (widgets[i].pageId === pageId) {
    //         widgets.splice(i, 1);
    //     }
    // }
    // var widget = _widgets.splice(startIndex, 1);
    // _widgets.splice(endIndex, 0, widget[0]);
    // widgets.push.apply(widgets, _widgets);
    // res.send("0");
}