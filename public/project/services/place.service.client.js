/**
 * Created by piyushgoel on 8/10/17.
 */
(function () {
    angular
        .module("TravelMate")
        .service("placeService", placeService);

    function placeService($http) {
        this.searchPlace = searchPlace;
        this.searchVenueById = searchVenueById;
        this.findIfAlreadyInList = findIfAlreadyInList;
        this.addToList = addToList;
        this.removeFromList = removeFromList;
        this.searchHost = searchHost;

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

        function findIfAlreadyInList(placeName, userId, userRole) {
            var url = "/api/place/" + placeName + "/user?userId=" + userId + "&userRole=" + userRole;
            return $http.get(url);
        }

        function addToList(placeName, userId, userRole) {
            var user = {_id: userId, role: userRole};
            var url = "/api/place/add/" + placeName;
            return $http.post(url, user);
        }

        function removeFromList(placeName, userId, userRole) {
            var user = {_id: userId, role: userRole};
            var url = "/api/place/remove/" + placeName;
            return $http.post(url, user);
        }

        function searchHost(placeName) {
            var url = "/api/placeHost/" + placeName;
            return $http.get(url);
        }
    }
})();