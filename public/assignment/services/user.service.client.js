/**
 * Created by piyushgoel on 7/20/17.
 */
(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService() {
        var users = [
            {
                _id: "123",
                username: "alice",
                password: "alice",
                firstName: "Alice",
                lastName: "Wonder",
                email: "alice@gmail.com"
            },
            {
                _id: "234",
                username: "bob",
                password: "bob",
                firstName: "Bob",
                lastName: "Marley",
                email: "bob@gmail.com"
            },
            {
                _id: "345",
                username: "charly",
                password: "charly",
                firstName: "Charly",
                lastName: "Garcia",
                email: "charly@gmail.com"
            },
            {
                _id: "456",
                username: "jannunzi",
                password: "jannunzi",
                firstName: "Jose",
                lastName: "Annunzi",
                email: "jose@gmail.com"
            }
        ];

        return {
            "findUserByCredentials": findUserByCredentials,
            "findUserByUserId": findUserByUserId,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function findUserByUserId(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    return users[u];
                }
            }
            return null;
        }

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }

        function findUserByUsername(user) {
            for(var u in users) {
                if(user.username === users[u].username) {
                    return users[u];
                }
            }
            return false;
        }

        function updateUser(userId, user) {
            for(var u in users) {
                if(users[u]._id === userId) {
                    users[u] = user;
                    return users[u];
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for(var u in users) {
                if(users[u]._id === userId) {
                    delete users[u];
                }
            }
        }
    }
})();