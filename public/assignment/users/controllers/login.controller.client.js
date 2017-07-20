/**
 * Created by piyushgoel on 7/20/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("loginController", loginController);

    function loginController($scope, $location, userService) {
        $scope.login = function (user) {
            var user = userService.findUserByUsernameAndPassword(user.username, user.password);
            if(user === null) {
                $scope.errorMessage = "Invalid username and password!!!";
            } else {
                $location.url("profile/" + user._id);
            }
        }
    }
})();