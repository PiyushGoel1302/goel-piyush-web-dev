/**
 * Created by piyushgoel on 7/22/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService.findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
            websiteService.findWebsiteById(model.wid)
                .then(function (response) {
                    model.website = response.data;
                });
        }
        init();

        function updateWebsite(website) {
            if(website.name) {
                websiteService.updateWebsite(website)
                    .then(function (response) {
                        $location.url("/user/" + model.userId + "/website");
                    });
            } else {
                model.errorMessage = "Enter the name of website";
            }
        }
        
        function deleteWebsite(website) {
            websiteService.deleteWebsite(website, model.userId)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website");
                });
        }
    }
})();