/**
 * Created by piyushgoel on 8/9/17.
 */
var mongoose = require("mongoose");

var pageSchema = mongoose.Schema({
    _website:    [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    name:        String,
    title:       String,
    description: String,
    widgets:     String,
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "page"});

module.exports = pageSchema;