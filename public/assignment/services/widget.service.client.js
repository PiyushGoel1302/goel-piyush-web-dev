/**
 * Created by piyushgoel on 7/23/17.
 */
(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService($http) {

        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.updateWidgetIndex = updateWidgetIndex;

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        function createWidget(widget, pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }

        function updateWidget(widget) {
            var url = "/api/widget/" + widget._id;
            return $http.put(url, widget);
        }

        function deleteWidget(widget) {
            var url = "/api/widget/" + widget._id;
            return $http.delete(url);
        }

        function updateWidgetIndex(startIndex, endIndex, pageId) {
            var url = "/api/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + endIndex;
            return $http.put(url);
        }
    }
})();