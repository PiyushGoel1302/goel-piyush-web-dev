/**
 * Created by piyushgoel on 7/28/17.
 */
var app = require("../../express");
var userModel = require("../models/user.model.server");

// var users = [
//     {
//         _id: "123",
//         username: "alice",
//         password: "alice",
//         firstName: "Alice",
//         lastName: "Wonder",
//         email: "alice@gmail.com",
//         isAdmin: true
//     },
//     {
//         _id: "234",
//         username: "bob",
//         password: "bob",
//         firstName: "Bob",
//         lastName: "Marley",
//         email: "bob@gmail.com",
//         isAdmin: false
//     },
//     {
//         _id: "345",
//         username: "charly",
//         password: "charly",
//         firstName: "Charly",
//         lastName: "Garcia",
//         email: "charly@gmail.com",
//         isAdmin: false
//     },
//     {
//         _id: "456",
//         username: "jannunzi",
//         password: "jannunzi",
//         firstName: "Jose",
//         lastName: "Annunzi",
//         email: "jose@gmail.com",
//         isAdmin: false
//     }
// ];

app.get("/api/user", getUser);
app.get("/api/user/:userId", getUserById);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function getUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            });
        // for (var u in users) {
        //     if (users[u].username === username && users[u].password === password) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
    }
    else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            });
        // for(var u in users) {
        //     if(username === users[u].username) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
    }
    res.send("0");
}

function getUserById(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        })
    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         res.send(users[u]);
    //         return;
    //     }
    // }
    // res.send("0");
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
    // user._id = (new Date()).getTime() + "";
    // users.push(user);
    // res.send(user);
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         users[u] = user;
    //         res.send(users[u]);
    //         return;
    //     }
    // }
    // res.send("0");
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         delete users[u];
    //     }
    // }
    // res.send("0");
}