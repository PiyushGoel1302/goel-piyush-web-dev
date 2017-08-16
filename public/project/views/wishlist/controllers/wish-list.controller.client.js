/**
 * Created by piyushgoel on 8/15/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("wishListController", wishListController);

    function wishListController($location, userService, user) {
        var model = this;
        var userId = user._id;
        model.userRole = user.role;

        function init() {
            userService.getWishList(userId)
                .then(function (response) {
                    model.places = response.data;
                    // console.log(model.places);
                })
        }
        init();
    }
})();