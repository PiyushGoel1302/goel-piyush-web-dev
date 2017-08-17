/**
 * Created by piyushgoel on 8/15/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("wishListController", wishListController);

    function wishListController($location, userService, user, $rootScope, placeService, $route) {
        var model = this;
        var userId = user._id;
        model.userRole = user.role;

        model.following = following;
        model.place = place;
        model.removeFromList = removeFromList;

        function init() {
            userService.getWishList(userId)
                .then(function (response) {
                    model.places = response.data;
                })
        }
        init();

        function removeFromList(placeName) {
            placeService.removeFromList(placeName, userId, model.userRole)
                .then(function (response) {
                    $route.reload();
                });
        }

        function following() {
            $rootScope.placeForHost = null;
            $location.url("/following");
        }

        function place() {
            $rootScope.place = null;
            $location.url("/place");
        }
    }
})();