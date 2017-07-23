/**
 * Created by piyushgoel on 7/23/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pid);
        }
        init();
    }
})();