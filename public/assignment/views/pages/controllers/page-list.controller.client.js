/**
 * Created by piyushgoel on 7/22/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;

        function init() {
            pageService.findPageByWebsiteId(model.wid)
                .then(function (response) {
                    model.pages = response.data;
                });
        }
        init();
    }
})();