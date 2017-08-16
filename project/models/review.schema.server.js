/**
 * Created by piyushgoel on 8/14/17.
 */
var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    content:   String,
    reviewer:  {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    _user:     {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    rating:    String
}, {collection: 'review'});

module.exports = reviewSchema;