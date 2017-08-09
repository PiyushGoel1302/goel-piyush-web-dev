/**
 * Created by piyushgoel on 8/9/17.
 */
var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("./website.model.server");

pageModel.findPageByWebsite = findPageByWebsite;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function findPageByWebsite(name, websiteId) {
    return pageModel.findOne({name: name, _website: websiteId});
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}

function createPage(websiteId, page) {
    page._website = websiteId;
    var pageTmp = null;
    return pageModel.create(page)
        .then(function (pageDoc) {
            pageTmp = pageDoc;
            return websiteModel.addPage(websiteId, pageDoc._id);
        })
        .then(function (websiteDoc) {
            return pageTmp;
        });
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel.removePage(websiteId, pageId);
        });
}