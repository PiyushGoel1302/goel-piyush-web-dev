/**
 * Created by piyushgoel on 8/17/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("reviewController", reviewController);

    function reviewController($rootScope, userReviewService, user, $route, $location) {
        var model = this;
        model.userId = user._id;
        model.userRole = user.role;

        model.addReview = addReview;
        model.deleteReview = deleteReview;
        model.following = following;
        model.place = place;

        function init() {
            userReviewService.findReviewForUser(model.userId)
                .then(function (response) {
                    model.reviewForUser = response.data;
                });
            userReviewService.findReviewByUser(model.userId)
                .then(function (response) {
                    model.reviewByUser = response.data;
                });
        }
        init();

        function addReview(content) {
            userReviewService.addReview(content, model.reviewUserId, model.userId)
                .then(function (response) {
                    $route.reload();
                });
        }

        function deleteReview(reviewId) {
            userReviewService.deleteReview(reviewId)
                .then(function (response) {
                    $route.reload();
                });
        }

        function following() {
            $rootScope.placeForHost = null;
            $location.url("/following");
        }

        function place() {
            $rootScope.place = null;
            $location.url("/place");
        }
    }
})();