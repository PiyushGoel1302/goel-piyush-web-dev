/**
 * Created by piyushgoel on 7/20/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location) {
        var model = this;
        var userId = $routeParams.userId;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService.findUserByUserId(userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user)
                .then(function (response) {
                    model.user = response.data;
                });
        }

        function deleteUser(user) {
            userService.deleteUser(user._id)
                .then(function (response) {
                    $location.url("login/");
                });
        }
    }
})();