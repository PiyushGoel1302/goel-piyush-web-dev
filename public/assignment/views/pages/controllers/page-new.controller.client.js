/**
 * Created by piyushgoel on 7/22/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;

        model.addNewPage = addNewPage;

        function init() {
            pageService.findPageByWebsiteId(model.wid)
                .then(function (response) {
                    model.pages = response.data;
                });
        }
        init();

        function addNewPage(page) {
            if(!page || !page.name) {
                model.errorMessage = "Enter the name of page";
                return;
            }
            var page_name = pageService.findPageByName(page.name, model.wid)
                .then(function (response) {
                    var page_name = response.data;
                    if(page_name === null) {
                        pageService.createPage(page, model.wid)
                            .then(function (response) {
                                $location.url("/user/" + model.userId + "/website/" + model.wid + "/page");
                            });
                    } else {
                        model.errorMessage = "Page already exists!!!";
                    }
                });
        }
    }
})();