/**
 * Created by piyushgoel on 7/20/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope) {
        var model = this;

        model.login = login;

        function init() {
            // $rootScope.title = "Login";
        }
        init();

        function login(user) {
            if(!user) {
                model.errorMessage = "Enter username and password";
                return;
            }
            userService.findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    _user = response.data;
                    if(_user === "0") {
                       model.errorMessage = "Invalid username and password!!!";
                    } else {
                        // $rootScope.currentUser = _user;
                        $location.url("profile/" + _user._id);
                    }
                });
        }
    }
})();