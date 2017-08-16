/**
 * Created by piyushgoel on 8/15/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("followersController", followersController);

    function followersController(userService, user) {
        var model = this;
        var userId = user._id;
        model.userRole = user.role;

        // model.searchHost = searchHost;
        // model.alreadyFollowing = alreadyFollowing;
        // model.follow = follow;
        // model.unfollow = unfollow;

        function init() {
            userService.getFollowersList(userId)
                .then(function (response) {
                    model.followers = response.data;
                });
        }
        init();

        // function searchHost(placeName) {
        //     placeService.searchHost(placeName)
        //         .then(function (response) {
        //             model.result = response.data;
        //         });
        // }

        // function alreadyFollowing(hostId) {
        //     var result = false;
        //     model.following.forEach(function (value) {
        //         if(value._id === hostId) {
        //             result = true;
        //         }
        //     });
        //     return result;
        // }

        // function follow(host) {
        //     userService.followUser(host, userId)
        //         .then(function (response) {
        //             alreadyFollowing(host._id);
        //         });
        // }
        //
        // function unfollow(host) {
        //     userService.unfollowUser(host, userId)
        //         .then(function (response) {
        //             alreadyFollowing(host._id);
        //         });
        // }
    }
})();