/**
 * Created by piyushgoel on 8/14/17.
 */
var mongoose = require('mongoose');

var userReviewSchema = mongoose.Schema({
    content:   String,
    reviewer:  [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModelProject'}],
    _user:     {type: mongoose.Schema.Types.ObjectId, ref: 'UserModelProject'},
    dateCreated: {type: Date, default: Date.now()}
}, {collection: 'projectuserreview'});

module.exports = userReviewSchema;