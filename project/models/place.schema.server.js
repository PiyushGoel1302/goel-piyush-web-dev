/**
 * Created by piyushgoel on 8/14/17.
 */
var mongoose = require("mongoose");

var placeSchema = mongoose.Schema({
    placeName:   String,
    address:     String,
    followers:   [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    hosts:       [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "place"});

module.exports = placeSchema;