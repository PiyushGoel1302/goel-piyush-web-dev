/**
 * Created by piyushgoel on 7/20/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("profileController", profileController);

    function profileController(userService, $location, user) {
        var model = this;
        var userId = user._id;
        model.userRole = user.role;

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
                    $location.url("/login");
                });
        }
    }
})();