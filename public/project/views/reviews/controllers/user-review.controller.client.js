/**
 * Created by piyushgoel on 8/16/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("userReviewController", userReviewController);

    function userReviewController($routeParams, userReviewService, user, $route, userService) {
        var model = this;
        model.userId = user._id;
        model.userRole = user.role;

        model.reviewUserId = $routeParams.userId;
        model.addReview = addReview;
        model.deleteReview = deleteReview;

        function init() {
            userService.findUserByUserId(model.reviewUserId)
                .then(function (response) {
                    model.reviewUser = response.data;
                });
            userReviewService.findReviewForUser(model.reviewUserId)
                .then(function (response) {
                    model.reviewForUser = response.data;
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
    }
})();