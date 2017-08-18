/**
 * Created by piyushgoel on 8/17/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("adminController", adminController);

    function adminController($location, userService, $route, user, placeService, userReviewService) {
        var model = this;
        var userId = user._id;
        model.userRole = user.role;

        model.editUser = editUser;
        model.changeUser = changeUser;
        model.removeUser = removeUser;
        model.logout = logout;

        function init() {
            userService.findAllUsers(model.userRole)
                .then(function (response) {
                    model.users = response.data;
                });
        }
        init();

        function editUser(user) {
            model.newUser = user;
            model.userId = user._id;
        }
        
        function changeUser(user) {
            if(!model.userId) {
                if(user.role === 'Traveller' || user.role === 'Host' || user.role === 'Admin') {
                    user.password = user.username;
                    userService.register(user);
                } else {
                    model.errorMessage = "User Role is incorrect";
                    return;
                }
            } else {
                userService.updateUser(model.userId, user);
            }
            $route.reload();
        }
        
        function removeUser(user) {

            userReviewService.deleteReviewByUser(user._id);

            userService.deleteUser(user._id)
                .then(function (response) {
                    $route.reload();
                });
        }

        function logout() {
            userService
                .logout()
                .then(
                    function (response) {
                        $location.url("/");
                    });
        }
    }
})();