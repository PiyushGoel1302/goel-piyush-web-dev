/**
 * Created by piyushgoel on 8/10/17.
 */
(function () {
    angular
        .module("poc")
        .service("placeService", placeService);

    function placeService($http) {
        this.searchPlace = searchPlace;
        this.searchVenueById = searchVenueById;

        client_id = process.env.FOURSQUARE_CLIENT_ID;

        client_secret = process.env.FOURSQUARE_CLIENT_SECRET;

        function searchPlace(placeName) {
            var url = "https://api.foursquare.com/v2/venues/search?client_id=" + client_id + "&client_secret=" + client_secret + "&v=20170101&near=" + placeName;
            return $http.get(url);
        }

        function searchVenueById(venueId) {
            var url = "https://api.foursquare.com/v2/venues/"+venueId+"?client_id=" + client_id + "&client_secret=" + client_secret + "&v=20170801";
            return $http.get(url);
        }
    }
})();