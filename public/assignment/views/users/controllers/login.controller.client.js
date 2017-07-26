/**
 * Created by piyushgoel on 7/20/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var model = this;

        model.login = login;

        function init() {

        }
        init();

        function login(user) {
            if(!user) {
                model.errorMessage = "Enter username and password";
                return;
            }
            user = userService.findUserByCredentials(user.username, user.password);
            if(user === null) {
                model.errorMessage = "Invalid username and password!!!";
            } else {
                $location.url("profile/" + user._id);
            }
        }
    }
})();