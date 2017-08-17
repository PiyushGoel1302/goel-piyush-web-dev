/**
 * Created by piyushgoel on 8/16/17.
 */
var mongoose = require('mongoose');

var placeReviewSchema = mongoose.Schema({
    content:   String,
    reviewer:  [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModelProject'}],
    _place:    {type: mongoose.Schema.Types.ObjectId, ref: 'PlaceModelProject'},
    dateCreated: {type: Date, default: Date.now()}
}, {collection: 'projectplacereview'});

module.exports = placeReviewSchema;