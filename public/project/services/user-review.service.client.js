/**
 * Created by piyushgoel on 8/16/17.
 */
(function () {
    angular
        .module("TravelMate")
        .service("userReviewService", userReviewService);

    function userReviewService($http) {
        this.addReview = addReview;
        this.deleteReview = deleteReview;

        function addReview(content, reviewUserId, reviewerId) {
            var review = {content: content, reviewer: reviewerId, _user: reviewUserId};
            return $http.post("/api/project/review", review);
        }

        function deleteReview(reviewId, userId) {
            var url = "/api/project/review/" + reviewId + "/user/" + userId;
            return $http.delete(url);
        }
    }
})();