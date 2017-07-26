/**
 * Created by piyushgoel on 7/22/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, pageService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.wid);
            model.page = pageService.findPageById(model.pid, model.wid);
        }
        init();

        function updatePage(page) {
            if(page.name) {
                pageService.updatePage(page, model.wid);
                $location.url("/user/" + model.userId + "/website/" + model.wid + "/page");
            } else {
                model.errorMessage = "Enter the name of page";
            }
        }

        function deletePage(page) {
            pageService.deletePage(page, model.wid);
            $location.url("/user/" + model.userId + "/website/" + model.wid + "/page");
        }
    }
})();