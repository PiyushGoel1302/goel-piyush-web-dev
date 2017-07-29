/**
 * Created by piyushgoel on 7/23/17.
 */
(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService($http) {
        var widgets = [
            {
                _id: "123",
                widgetType: "HEADING",
                pageId: "321",
                size: 2,
                text: "GIZMODO"
            },
            {
                _id: "234",
                widgetType: "HEADING",
                pageId: "321",
                size: 4,
                text: "Lorem ipsum"
            },
            {
                _id: "345",
                widgetType: "IMAGE",
                pageId: "321",
                width: "100%",
                url: "http://lorempixel.com/400/200/"
            },
            {
                _id: "456",
                widgetType: "HTML",
                pageId: "321",
                text: "<p>Lorem ipsum</p>"
            },
            {
                _id: "567",
                widgetType: "HEADING",
                pageId: "321",
                size: 4,
                text: "Lorem ipsum"
            },
            {
                _id: "678",
                widgetType: "YOUTUBE",
                pageId: "321",
                width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E"
            },
            {
                _id: "789",
                widgetType: "HTML",
                pageId: "321",
                text: "<p>Lorem ipsum</p>"
            }
        ];

        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

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
    }
})();