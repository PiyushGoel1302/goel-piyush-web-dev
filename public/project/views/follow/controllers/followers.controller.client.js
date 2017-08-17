/**
 * Created by piyushgoel on 8/15/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("followersController", followersController);

    function followersController(userService, user, $rootScope, $location) {
        var model = this;
        var userId = user._id;
        model.userRole = user.role;

        model.place = place;

        function init() {
            userService.getFollowersList(userId)
                .then(function (response) {
                    model.followers = response.data;
                });
        }
        init();

        function place() {
            $rootScope.place = null;
            $location.url("/place");
        }
    }
})();