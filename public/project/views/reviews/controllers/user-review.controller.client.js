/**
 * Created by piyushgoel on 8/16/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("userReviewController", userReviewController);

    function userReviewController($routeParams, userReviewService, user, $route) {
        var model = this;
        var userId = user._id;
        model.userRole = user.role;

        model.reviewUserId = $routeParams.userId;
        model.addReview = addReview;
        model.deleteReview = deleteReview;

        function init() {
            userService.findUserByUserId(reviewUserId)
                .then(function (response) {
                    model.reviewUser = response.data;
                });
        }
        init();
        
        function addReview(reviewContent) {
            userReviewService.addReview(reviewContent, model.reviewUserId, userId)
                .then(function (response) {
                    $route.reload();
                });
        }

        function deleteReview(reviewId) {
            userReviewService.deleteReview(reviewId, reviewUserId)
                .then(function (response) {
                    $route.reload();
                });
        }
    }
})();