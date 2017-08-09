/**
 * Created by piyushgoel on 8/9/17.
 */
var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require("./user.model.server");

websiteModel.findWebsitesByName = findWebsitesByName;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function findWebsitesByName(name, userId) {
    return websiteModel.findOne({name: name, _user: userId});
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId})
        .populate('developer', 'username')
        .exec();
}

function createWebsite(userId, website) {
    website._user = userId;
    var websiteTmp = null;
    return websiteModel.create(website)
        .then(function (websiteDoc) {
            websiteTmp = websiteDoc;
            return userModel.addWebsite(userId, websiteDoc._id);
        })
        .then(function (userDoc) {
            return websiteTmp;
        });
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel.removeWebsite(userId, websiteId)
        });
}