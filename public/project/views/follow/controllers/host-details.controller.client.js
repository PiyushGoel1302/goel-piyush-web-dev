/**
 * Created by piyushgoel on 8/16/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("hostDetailsController", hostDetailsController);

    function hostDetailsController($routeParams, userService) {
        var model = this;

        model.hostId = $routeParams.hostId;

        function init() {
            userService.findUserByUserId(model.hostId)
                .then(function (response) {
                    model.host = response.data;
                });
        }
        init();
    }
})();