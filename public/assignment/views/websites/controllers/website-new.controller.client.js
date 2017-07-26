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
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();

        function createWebsite(website) {
            if(!website || !website.name) {
                model.errorMessage = "Enter the name of website";
                return;
            }
            var website_name = websiteService.findWebsiteByName(website.name, model.userId);
            if(!website_name) {
                websiteService.createWebsite(website, model.userId);
                $location.url("/user/" + model.userId + "/website");
            } else {
                model.errorMessage = "Website already exists!!!";
            }
        }
    }
})();