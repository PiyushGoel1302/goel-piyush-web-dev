
(function () {
    angular
        .module("TravelMate")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope) {
        var model = this;

        model.login = login;
        model.back = back;

        function init() {
            // $rootScope.title = "Login";
        }
        init();

        function login(user) {
            if(!user) {
                model.errorMessage = "Enter username and password";
                return;
            }
            userService.login(user.username, user.password)
                .then(function (response) {
                    var _user = response.data;
                    if(_user.role === "Admin") {
                        $location.url("/adminProfile");
                        return;
                    } else {
                        $location.url("/profile");
                    }
                }, function (err) {
                    model.errorMessage = "Invalid Username and Password combination!!!"
                });
        }

        function back() {
            $rootScope.placeName = null;
            $location.url("/");
        }
    }
})();