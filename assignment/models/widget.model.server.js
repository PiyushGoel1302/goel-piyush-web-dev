/**
 * Created by piyushgoel on 8/9/17.
 */
var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);

widgetModel.findAllPWidgetsForPage = findAllPWidgetsForPage;
widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;
var pageModel = require("./page.model.server");

function findAllPWidgetsForPage(pageId) {
    // return widgetModel.find({_page: pageId});
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            return page.widgets;
        });
}

function createWidget(pageId, widget) {
    var widgetTmp = null;
    widget._page = pageId;
    return widgetModel.create(widget)
        .then(function (widgetDoc) {
            widgetTmp = widgetDoc;
            return pageModel.addWidget(pageId, widgetDoc._id);
        })
        .then(function (pageDoc) {
            return widgetTmp;
        });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel.removeWidget(pageId, widgetId);
        });
}

function reorderWidget(pageId, startIndex, endIndex) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var _widget = page.widgets.splice(startIndex, 1)[0];
            page.widgets.splice(endIndex, 0, _widget);
            return page.save();
        });
}