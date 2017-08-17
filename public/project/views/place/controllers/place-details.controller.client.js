/**
 * Created by piyushgoel on 8/16/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("placeDetailsController", placeDetailsController);

    function placeDetailsController($routeParams, placeService) {
        var model = this;

        model.placeId = $routeParams.placeId;

        function init() {
            placeService.searchVenueById(model.placeId)
                .then(function (response) {
                    model.place = response.data.response.venue;
                });
        }
        init();
    }
})();