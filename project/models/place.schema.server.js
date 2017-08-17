/**
 * Created by piyushgoel on 8/14/17.
 */
var mongoose = require("mongoose");

var placeSchema = mongoose.Schema({
    placeName:   String,
    address:     String,
    followers:   [{type: mongoose.Schema.Types.ObjectId, ref: "UserModelProject"}],
    hosts:       [{type: mongoose.Schema.Types.ObjectId, ref: "UserModelProject"}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "projectplace"});

module.exports = placeSchema;