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
            model.widgets = widgetService.findWidgetsByPageId(model.pid);
            model.widget = widgetService.findWidgetById(model.wgid, model.pid);
        }
        init();

        function updateWidget(widget) {
            if(widget.widgetType === "HEADING" && !widget.text) {
                model.errorMessage = "Enter the text of the header";
                return;
            } else if(widget.widgetType === "IMAGE" && !widget.url) {
                model.errorMessage = "Enter the url of the image";
                return;
            } else if(widget.widgetType === "YOUTUBE" && !widget.url) {
                model.errorMessage = "Enter the url of the video";
                return;
            } else {
                widgetService.updateWidget(widget, model.pid);
                $location.url("/user/" + model.userId + "/website/" + model.wid + "/page/" + model.pid + "/widget");
            }
        }

        function deleteWidget(widget) {
            widgetService.deleteWidget(widget, model.pid);
            $location.url("/user/" + model.userId + "/website/" + model.wid + "/page/" + model.pid + "/widget");
        }
    }
})();