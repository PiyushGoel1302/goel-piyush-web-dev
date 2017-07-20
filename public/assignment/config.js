/**
 * Created by piyushgoel on 7/20/17.
 */
(function () {
    angular
        .module("WamApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {templateUrl: "users/templates/login.view.client.html"})
            .when("/register", {templateUrl: "users/templates/register.view.client.html"})
            .when("/profile/:userId", {templateUrl: "users/templates/profile.view.client.html"})
    }
})();