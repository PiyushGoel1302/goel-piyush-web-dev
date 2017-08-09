/**
 * Created by piyushgoel on 8/9/17.
 */
var mongoose = require("mongoose");

var websiteSchema = mongoose.Schema({
    _user:       [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    name:        String,
    description: String,
    pages:       String,
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "website"});

module.exports = websiteSchema;