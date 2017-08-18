/**
 * Created by piyushgoel on 8/9/17.
 */
(function () {
    angular
        .module("WamApp")
        .service("FlickrService", FlickrService);
    function FlickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "af9563b42889d7c83163bd26887936f4";
        var secret = "614b382ae89ce051";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url)
                .then(function (response) {
                    return response;
                })
        }
    }
})();