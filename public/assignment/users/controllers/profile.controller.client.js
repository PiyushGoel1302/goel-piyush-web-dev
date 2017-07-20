/**
 * Created by piyushgoel on 7/20/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($scope, $routeParams, userService) {
        var userId = $routeParams.userId;
        $scope.user = userService.findUserByUserId(userId);
    }
})();