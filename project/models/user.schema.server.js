/**
 * Created by piyushgoel on 8/8/17.
 */
var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username:    String,
    password:    String,
    firstName:   String,
    lastName:    String,
    email:       String,
    phone:       String,
    role:        {type: String, enum: ["Admin", "Host", "Traveller"]},
    following:   [{type: mongoose.Schema.Types.ObjectId, ref: "UserModelProject"}],
    followers:   [{type: mongoose.Schema.Types.ObjectId, ref: "UserModelProject"}],
    wishlist:    [{type: mongoose.Schema.Types.ObjectId, ref: "PlaceModelProject"}],
    reviews:     [{type: mongoose.Schema.Types.ObjectId, ref: "UserReviewModel"}],
    google:      {id: String, token: String},
    facebook:    {id: String, token: String},
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "projectuser"});

module.exports = userSchema;