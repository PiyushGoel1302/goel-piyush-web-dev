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
        this.findReviewForUser = findReviewForUser;
        this.findReviewByUser = findReviewByUser;
        this.deleteReviewByUser = deleteReviewByUser;

        function addReview(content, reviewUserId, reviewerId) {
            var review = {content: content, reviewer: reviewerId, _user: reviewUserId};
            return $http.post("/api/project/review", review);
        }

        function deleteReview(reviewId) {
            var url = "/api/project/review/" + reviewId;
            return $http.delete(url);
        }

        function findReviewForUser(userId) {
            var url = "/api/project/review/" + userId;
            return $http.get(url);
        }

        function findReviewByUser(userId) {
            var url = "/api/project/reviewBy/" + userId;
            return $http.get(url);
        }

        function deleteReviewByUser(userId) {
            var url = "/api/project/reviewByUser/" + userId;
            return $http.delete(url);
        }
    }
})();