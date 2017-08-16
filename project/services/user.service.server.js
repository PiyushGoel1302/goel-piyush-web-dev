
var app = require("../../express");
var userModel = require("../models/user.model.server");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : "462891680942-3k3jr2ti4mojccuviulcl6a7almp69o1.apps.googleusercontent.com",
    clientSecret : "GzvNwGzFmdn81DIPUxsM-VZw",
    callbackURL  : "http://127.0.0.1:3000/google/callback"
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

app.post("/api/login", passport.authenticate('local'), login);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", getUser);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.get("/api/checkLogin", checkLogin);
app.get("/api/wishlist/:userId", getWishList);
app.get("/api/followers/user/:userId", getFollowersList);
app.get("/api/following/user/:userId", getFollowingList);
app.put("/api/follow/user/:userId", followUser);
app.put("/api/unfollow/user/:userId", unfollowUser);
app.get("/api/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function getUser(req, res) {
    var username = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            res.json(user);
            return;
        }, function (err) {
            res.sendStatus(404).send("0");
            return;
        });
}

function getUserById(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        })
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(user);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.json(status);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}

function getWishList(req, res) {
    var userId = req.params.userId;
    userModel.findUserById(userId)
        .then(function (data) {
            res.json(data.wishlist);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}

function getFollowersList(req, res) {
    var userId = req.params.userId;
    userModel.findUserById(userId)
        .then(function (data) {
            res.json(data.followers);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}

function getFollowingList(req, res) {
    var userId = req.params.userId;
    userModel.findUserById(userId)
        .then(function (data) {
            res.json(data.following);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}

function followUser(req, res) {
    var userId = req.params.userId;
    var host = req.body;
    userModel.followUser(userId, host)
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}

function unfollowUser(req, res) {
    var userId = req.params.userId;
    var host = req.body;
    userModel.unfollowUser(userId, host)
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}