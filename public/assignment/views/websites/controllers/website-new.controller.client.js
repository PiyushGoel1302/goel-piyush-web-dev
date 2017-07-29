/**
 * Created by piyushgoel on 7/21/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams.userId;

        model.createWebsite = createWebsite;

        function init() {
            websiteService.findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
        }
        init();

        function createWebsite(website) {
            if(!website || !website.name) {
                model.errorMessage = "Enter the name of website";
                return;
            }
            websiteService.findWebsiteByName(website.name, model.userId)
                .then(function (response) {
                    var website_name = response.data;
                    if(website_name === "0") {
                        websiteService.createWebsite(website, model.userId)
                            .then(function (response) {
                                $location.url("/user/" + model.userId + "/website");
                            });
                    } else {
                        model.errorMessage = "Website already exists!!!";
                    }
                });
        }
    }
})();