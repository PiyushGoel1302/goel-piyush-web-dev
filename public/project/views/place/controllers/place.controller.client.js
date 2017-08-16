/**
 * Created by piyushgoel on 8/14/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("placeController", placeController);

    function placeController($route, placeService, user, $rootScope) {
        var model = this;
        var userId = user._id;
        model.userRole = user.role;

        model.searchPlace = searchPlace;
        model.addToList = addToList;
        model.removeFromList = removeFromList;

        function init() {
            model.placeName = $rootScope.placeName;
            model.searchPlace(model.placeName);
        }
        init();

        function searchPlace(placeName) {
            $rootScope.placeName = placeName;
            placeService.searchPlace(placeName)
                .then(function (response) {
                    model.result = response.data;
                });
            placeService.findIfAlreadyInList(placeName, userId, model.userRole)
                .then(function (response) {
                    // console.log(response.data);
                    model.alreadyInList = response.data !== null;
                    // console.log(model.alreadyInList);
                });
        }

        function addToList(placeName) {
            // console.log(placeName);
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
    }
})();