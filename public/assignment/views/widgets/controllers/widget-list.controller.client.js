/**
 * Created by piyushgoel on 7/23/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $sce) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;

        model.trustUrl = trustUrl;
        model.trustHtmlContent = trustHtmlContent;

        function init() {
            widgetService.findWidgetsByPageId(model.pid)
                .then(function (response) {
                    model.widgets = response.data;
                });
        }
        init();

        function trustUrl(url) {
            // console.log($sce.trustAsResourceUrl(url));
            var youtubeUrl = "https://youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }

        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }
    }
})();