/**
 * Created by piyushgoel on 8/10/17.
 */
(function () {
    angular
        .module("poc")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, placeService) {
        var model = this;

        model.venueId = $routeParams.venueId;

        function init() {
            placeService.searchVenueById(model.venueId)
                .then(function (response) {
                    model.venue = response.data.response.venue;
                });
        }
        init();
    }
})();