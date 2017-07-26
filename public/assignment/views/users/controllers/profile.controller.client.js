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
            model.user = userService.findUserByUserId(userId);
        }
        init();

        function updateUser(user) {
            model.user = userService.updateUser(user._id, user);
        }

        function deleteUser(user) {
            userService.deleteUser(user._id);
            $location.url("login/");
        }
    }
})();