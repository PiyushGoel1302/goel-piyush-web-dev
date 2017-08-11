/**
 * Created by piyushgoel on 8/10/17.
 */
(function () {
    angular
        .module("poc")
        .controller("searchController", searchController);

    function searchController(placeService) {
        var model = this;

        model.searchPlace = searchPlace;

        function init() {

        }
        init();

        function searchPlace(placeName) {
            placeService.searchPlace(placeName)
                .then(function (response) {
                    model.result = response.data;
                });
        }
    }
})();