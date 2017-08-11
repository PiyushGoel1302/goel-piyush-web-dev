/**
 * Created by piyushgoel on 8/10/17.
 */
(function () {
    angular
        .module("poc")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/templates/search.view.client.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/venue/:venueId", {
                templateUrl: "views/templates/details.view.client.html",
                controller: "detailsController",
                controllerAs: "model"
            })
    }
})();