/**
 * Created by piyushgoel on 8/16/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("placeReviewController", placeReviewController);

    function placeReviewController($routeParams, placeReviewService, user, $route, placeService) {
        var model = this;
        model.userId = user._id;
        model.userRole = user.role;

        model.placeId = $routeParams.placeId;
        model.addReview = addReview;
        model.deleteReview = deleteReview;

        function init() {
            placeService.findPlaceByPlaceId(model.placeId)
                .then(function (response) {
                    model.place = response.data;
                });
            placeReviewService.findReviewForPlace(model.placeId)
                .then(function (response) {
                    model.reviewForPlace = response.data;
                });
        }
        init();

        function addReview(content) {
            placeReviewService.addReview(content, model.placeId, model.userId)
                .then(function (response) {
                    $route.reload();
                });
        }

        function deleteReview(reviewId) {
            placeReviewService.deleteReview(reviewId)
                .then(function (response) {
                    $route.reload();
                });
        }
    }
})();