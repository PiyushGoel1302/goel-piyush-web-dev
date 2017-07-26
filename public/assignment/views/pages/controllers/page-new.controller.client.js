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
            model.pages = pageService.findPageByWebsiteId(model.wid);
        }
        init();

        function addNewPage(page) {
            if(!page || !page.name) {
                model.errorMessage = "Enter the name of page";
                return;
            }
            var page_name = pageService.findPageByName(page.name, model.wid);
            if(!page_name) {
                pageService.createPage(page, model.wid);
                $location.url("/user/" + model.userId + "/website/" + model.wid + "/page");
            } else {
                model.errorMessage = "Page already exists!!!";
            }
        }
    }
})();