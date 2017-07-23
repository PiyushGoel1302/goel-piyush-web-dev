/**
 * Created by piyushgoel on 7/20/17.
 */
(function () {
    angular
        .module("WamApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "users/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "users/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "users/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/user/:userId/website", {
                templateUrl: "websites/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/new", {
                templateUrl: "websites/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid", {
                templateUrl: "websites/templates/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid/page", {
                templateUrl: "pages/templates/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid/page/new", {
                templateUrl: "pages/templates/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid/page/:pid", {
                templateUrl: "pages/templates/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid/page/:pid/widget", {
                templateUrl: "widgets/templates/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/new", {
                templateUrl: "widgets/templates/widget-choose.view.client.html",
                controller: "widgetChooserController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "widgets/templates/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })
    }
})();