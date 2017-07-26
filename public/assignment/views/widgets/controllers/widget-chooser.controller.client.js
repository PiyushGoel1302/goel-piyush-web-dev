/**
 * Created by piyushgoel on 7/23/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("widgetChooserController", widgetChooserController);

    function widgetChooserController($routeParams, widgetService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;

        model.createWidget = createWidget;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pid);
        }
        init();

        function createWidget(type) {
            var widget = {widgetType: type};
            var widgetId = widgetService.createWidget(widget, model.pid);
            $location.url("/user/" + model.userId + "/website/" + model.wid + "/page/" + model.pid + "/widget/" + widgetId);
        }
    }
})();