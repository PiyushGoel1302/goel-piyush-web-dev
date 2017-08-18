/**
 * Created by piyushgoel on 8/16/17.
 */
(function () {
    angular
        .module("TravelMate")
        .service("placeReviewService", placeReviewService);

    function placeReviewService($http) {
        this.addReview = addReview;
        this.deleteReview = deleteReview;
        this.findReviewForPlace = findReviewForPlace;

        function addReview(content, placeId, reviewerId) {
            var review = {content: content, reviewer: reviewerId, _place: placeId};
            return $http.post("/api/project/place/review", review);
        }

        function deleteReview(reviewId) {
            var url = "/api/project/place/review/" + reviewId;
            return $http.delete(url);
        }

        function findReviewForPlace(placeId) {
            var url = "/api/project/place/review/" + placeId;
            return $http.get(url);
        }
    }
})();