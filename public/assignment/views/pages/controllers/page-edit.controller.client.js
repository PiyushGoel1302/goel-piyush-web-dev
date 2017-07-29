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
            pageService.findPageByWebsiteId(model.wid)
                .then(function (response) {
                    model.pages = response.data;
                });
            pageService.findPageById(model.pid)
                .then(function (response) {
                    model.page = response.data;
                });
        }
        init();

        function updatePage(page) {
            if(page.name) {
                pageService.updatePage(page)
                    .then(function (response) {
                        $location.url("/user/" + model.userId + "/website/" + model.wid + "/page");
                    });
            } else {
                model.errorMessage = "Enter the name of page";
            }
        }

        function deletePage(page) {
            pageService.deletePage(page)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.wid + "/page");
                });
        }
    }
})();