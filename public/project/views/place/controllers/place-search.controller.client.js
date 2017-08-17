/**
 * Created by piyushgoel on 8/14/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("placeController", placeController);

    function placeController($route, placeService, user, $rootScope, $location) {
        var model = this;
        var userId = user._id;
        model.userRole = user.role;

        model.searchPlace = searchPlace;
        model.addToList = addToList;
        model.removeFromList = removeFromList;
        model.following = following;

        function init() {
            if($rootScope.place) {
                model.placeName = $rootScope.place;
                model.searchPlace(model.placeName);
            }
        }
        init();

        function searchPlace(placeName) {
            $rootScope.place = placeName;
            placeService.searchPlace(placeName)
                .then(function (response) {
                    model.result = response.data;
                });
            placeService.findIfAlreadyInList(placeName, userId, model.userRole)
                .then(function (response) {

                    model.alreadyInList = response.data !== null;
                    // console.log(model.alreadyInList);
                });
        }

        function addToList(placeName) {
            placeService.addToList(placeName, userId, model.userRole)
                .then(function (response) {
                    $route.reload();
                });
        }

        function removeFromList(placeName) {
            placeService.removeFromList(placeName, userId, model.userRole)
                .then(function (response) {
                    $route.reload();
                });
        }

        function following() {
            $rootScope.placeForHost = null;
            $location.url("/following");
        }
    }
})();