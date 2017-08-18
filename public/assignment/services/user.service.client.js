/**
 * Created by piyushgoel on 7/20/17.
 */
(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http) {

        return {
            "findUserByCredentials": findUserByCredentials,
            "findUserByUserId": findUserByUserId,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function findUserByUserId(userId) {
            return $http.get("/api/user/" + userId);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }
    }
})();