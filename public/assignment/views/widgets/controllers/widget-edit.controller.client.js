/**
 * Created by piyushgoel on 7/23/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.wgid = $routeParams.wgid;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            widgetService.findWidgetsByPageId(model.pid)
                .then(function (response) {
                    model.widgets = response.data;
                });
            widgetService.findWidgetById(model.wgid)
                .then(function (response) {
                    model.widget = response.data;
                });
        }
        init();

        function updateWidget(widget) {
            widgetService.updateWidget(widget)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.wid + "/page/" + model.pid + "/widget");
                });
        }

        function deleteWidget(widget) {
            widgetService.deleteWidget(model.pid, widget)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.wid + "/page/" + model.pid + "/widget");
                });
        }
    }
})();