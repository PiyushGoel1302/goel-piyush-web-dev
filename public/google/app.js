/**
 * Created by piyushgoel on 8/3/17.
 */
(function () {
    angular
        .module("googleData", ["ngRoute"])
        .controller("searchController", searchController)
        .service("placeService", placeService);

    function searchController(placeService) {
        var model = this;

        model.searchPlace = searchPlace;

        function init() {

        }
        init();

        function searchPlace(placeName) {
            placeService.searchPlace(placeName)
                .then(renderPlaces);
        }

        function renderPlaces(places) {
            model.places = places;
        }
    }

    function placeService($http) {
        this.searchPlace = searchPlace;

        function searchPlace(placeName) {
            var url = "https://api.foursquare.com/v2/venues/search?client_id=5DASS3X4IBEZDYMUA3LQOBJKKQTERN2AXMCIJFIFTV2YQFQF&client_secret=AIGQZQE4TUDU332ZIQ5SEVJD0CROE3QF0GZ5F0BGRJNFVJET&v=20170101&near=" + placeName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();