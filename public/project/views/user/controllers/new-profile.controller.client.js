/**
 * Created by piyushgoel on 8/16/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("newProfileController", newProfileController);

    function newProfileController(userService, $location, user, $rootScope, $route) {
        var model = this;
        var userId = user._id;
        model.userRole = user.role;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.following = following;
        model.place = place;

        function init() {
            userService.findUserByUserId(userId)
                .then(function (response) {
                    model.user = response.data;
                    if(model.user.role) {
                        $location.url("/profile")
                    }
                });
        }

        init();

        function updateUser(user) {
            if(!user.role) {
                model.errorMessage = "Enter User Role!!!"
            } else {
                userService.updateUser(user._id, user)
                    .then(function (response) {
                        model.user = response.data;
                        $location.url("/profile")
                    });
            }
        }

        function deleteUser(user) {
            userService.deleteUser(user._id)
                .then(function (response) {
                    $location.url("/login");
                });
        }

        function logout() {
            userService
                .logout()
                .then(
                    function (response) {
                        $rootScope.placeName = null;
                        $rootScope.placeForHost = null;
                        $rootScope.place = null;
                        $location.url("/");
                    });
        }

        function following() {
            $rootScope.placeForHost = null;
            $location.url("/following");
        }

        function place() {
            $rootScope.place = null;
            $location.url("/place");
        }
    }
})();