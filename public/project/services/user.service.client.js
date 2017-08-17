
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
            "unfollowUser": unfollowUser,
            "removeFromFollowersList": removeFromFollowersList,
            "removeFromFollowingList": removeFromFollowingList
        };

        function checkLogin() {
            return $http.get("/api/project/checkLogin")
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/project/login";
            return $http.post(url, {username: username, password: password});
        }

        function logout(user) {
            return $http.post("/api/project/logout");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }


        function findUserByUserId(userId) {
            return $http.get("/api/project/user/" + userId);
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username=" + username;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url);
        }

        function getWishList(userId) {
            var url = "/api/project/wishlist/" + userId;
            return $http.get(url);
        }

        function getFollowersList(userId) {
            var url = "/api/project/followers/user/" + userId;
            return $http.get(url);
        }

        function getFollowingList(userId) {
            var url = "/api/project/following/user/" + userId;
            return $http.get(url);
        }

        function followUser(host, userId) {
            var url = "/api/project/follow/user/" + userId;
            return $http.put(url, host);
        }

        function unfollowUser(host, userId) {
            var url = "/api/project/unfollow/user/" + userId;
            return $http.put(url, host);
        }

        function removeFromFollowersList(userId, follower) {
            var url = "/api/project/delete/follower/user/" + userId;
            return $http.post(url, follower);
        }

        function removeFromFollowingList(userId, following) {
            var url = "/api/project/delete/following/user/" + userId;
            return $http.post(url, following);
        }
    }
})();