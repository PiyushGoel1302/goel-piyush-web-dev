
(function () {
    angular
        .module("TravelMate")
        .factory("userService", userService);

    function userService($http) {

        return {
            "login": login,
            "logout": logout,
            "findUserByUserId": findUserByUserId,
            "createUser": createUser,
            "register": register,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "checkLogin": checkLogin,
            "getWishList": getWishList,
            "getFollowersList": getFollowersList,
            "getFollowingList": getFollowingList,
            "followUser": followUser,
            "unfollowUser": unfollowUser
        };

        function checkLogin() {
            return $http.get("/api/checkLogin")
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/login";
            return $http.post(url, {username: username, password: password});
        }

        function logout(user) {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
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

        function getWishList(userId) {
            var url = "/api/wishlist/" + userId;
            return $http.get(url);
        }

        function getFollowersList(userId) {
            var url = "/api/followers/user/" + userId;
            return $http.get(url);
        }

        function getFollowingList(userId) {
            var url = "/api/following/user/" + userId;
            return $http.get(url);
        }

        function followUser(host, userId) {
            var url = "/api/follow/user/" + userId;
            return $http.put(url, host);
        }

        function unfollowUser(host, userId) {
            var url = "/api/unfollow/user/" + userId;
            return $http.put(url, host);
        }
    }
})();