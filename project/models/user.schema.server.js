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
    following:   [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    followers:   [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    wishlist:    [{type: mongoose.Schema.Types.ObjectId, ref: "PlaceModel"}],
    google:      {id: String, token: String},
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "user"});

module.exports = userSchema;