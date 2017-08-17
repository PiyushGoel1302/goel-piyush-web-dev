/**
 * Created by piyushgoel on 8/10/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("searchController", searchController);

    function searchController(placeService, $rootScope) {
        var model = this;

        model.searchPlace = searchPlace;

        function init() {
            if($rootScope.placeName) {
                model.placeName = $rootScope.placeName;
                model.searchPlace(model.placeName);
            }
        }
        init();

        function searchPlace(placeName) {
            $rootScope.placeName = placeName;
            placeService.searchPlace(placeName)
                .then(function (response) {
                    model.result = response.data;
                });
        }
    }
})();