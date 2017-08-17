/**
 * Created by piyushgoel on 8/16/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("followersDetailsController", followersDetailsController);

    function followersDetailsController($routeParams, userService) {
        var model = this;

        model.followerId = $routeParams.followerId;

        function init() {
            userService.findUserByUserId(model.followerId)
                .then(function (response) {
                    model.follower = response.data;
                });
        }
        init();
    }
})();