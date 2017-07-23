/**
 * Created by piyushgoel on 7/23/17.
 */
(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService() {
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
                url: "https://www.youtube.com/embed/uLWLashCXHE"
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

        function findWidgetsByPageId(pid) {
            var _widgets = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pid) {
                    _widgets.push(widgets[w]);
                }
            }
            return _widgets;
        }

        function findWidgetById(wgid, pid) {
            for(var w in widgets) {
                if(widgets[w].pageId === pid && widgets[w]._id === wgid) {
                    return widgets[w];
                }
            }
        }

        function createWidget(widget, pid) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pid;
            widgets.push(widget);
            return widget._id;
        }

        function updateWidget(widget, pid) {
            for(var w in widgets) {
                if(widgets[w].pageId === pid && widgets[w]._id === widget._id) {
                    widgets[w] = widget;
                }
            }
        }

        function deleteWidget(widget, pid) {
            for(var w in widgets) {
                if(widgets[w].pageId === pid && widgets[w]._id === widget._id) {
                    delete widgets[w];
                }
            }
        }
    }
})();