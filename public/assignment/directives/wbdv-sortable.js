/**
 * Created by piyushgoel on 8/1/17.
 */
(function () {
    angular
        .module("webDevDirective", [])
        .directive("webdevDirective", webdevDirective);

    function webdevDirective(widgetService) {

        function linkFunction(scope, element) {
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .sortable({
                    axis: "y",
                    handle: ".handle-sorting",
                    start: function (event, ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function (event, ui) {
                        endIndex = ui.item.index();
                        widgetService.updateWidgetIndex(startIndex, endIndex, scope.model.pid);
                    }
                });
        }
        return {
            link: linkFunction
        };
    }
})();