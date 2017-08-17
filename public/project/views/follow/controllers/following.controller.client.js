/**
 * Created by piyushgoel on 8/15/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("followingController", followingController);

    function followingController(userService, placeService, user, $route, $rootScope, $location) {
        var model = this;
        var userId = user._id;
        model.userRole = user.role;

        model.unfollow = unfollow;
        model.searchHost = searchHost;
        model.alreadyFollowing = alreadyFollowing;
        model.follow = follow;
        model.place = place;

        function init() {
            userService.getFollowersList(userId)
                .then(function (response) {
                    model.followers = response.data;
                });
            userService.getFollowingList(userId)
                .then(function (response) {
                    model.following = response.data;
                });
            if($rootScope.placeForHost) {
                model.placeName = $rootScope.placeForHost;
                model.searchHost(model.placeName);
            }
        }
        init();

        function searchHost(placeName) {
            $rootScope.placeForHost = placeName;
            placeService.searchHost(placeName)
                .then(function (response) {
                    model.result = response.data;
                });
        }

        function alreadyFollowing(hostId) {
            var result = false;
            model.following.forEach(function (value) {
                if(value._id === hostId) {
                    result = true;
                }
            });
            return result;
        }

        function follow(host) {
            userService.followUser(host, userId)
                .then(function (response) {
                    $route.reload();
                });
        }

        function unfollow(host) {
            userService.unfollowUser(host, userId)
                .then(function (response) {
                    $route.reload();
                });
        }

        function place() {
            $rootScope.place = null;
            $location.url("/place");
        }
    }
})();