/**
 * Created by piyushgoel on 8/9/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, widgetService, $location, FlickrService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.wgid = $routeParams.wgid;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {

        }
        init();

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                    console.log(data.photos);
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            widgetService.findWidgetById(model.wgid).then(function (response) {
                var _widget = response;
                _widget.url = url;
                _widget._id = model.wgid;
                return widgetService.updateWidget(_widget);
            })
                .then(function (response) {
                    $location.url("/user/"+model.userId+"/website/"+model.wid+"/page/"+model.pid+'/widget/');
                });
        }
    }
})();