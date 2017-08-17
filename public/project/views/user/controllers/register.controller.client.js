
(function () {
    angular
        .module("TravelMate")
        .controller("registerController", registerController);
    
    function registerController(userService, $location, $rootScope) {
        var model = this;
        
        model.createUser = createUser;
        model.back = back;
        
        function init() {
            
        }
        init();

        function createUser(user) {
            if(!user) {
                model.errorMessage = "Enter details to register";
                return;
            }
            if(!user.username) {
                model.errorMessage = "Enter username to register";
                return;
            }
            if(!user.role) {
                model.errorMessage = "Enter user role";
                return;
            }
            if(!user.password || !user.password2) {
                model.errorMessage = "Enter password";
                return;
            }
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if (_user === null) {
                        if (user.password === user.password2) {
                            userService
                                .register(user)
                                .then(
                                    function(response) {
                                        $rootScope.currentUser = response.data;
                                        $location.url("/profile");
                                    });

                        } else {
                            model.errorMessage = "Password Verification Failed!!!";
                        }
                    } else {
                        model.errorMessage = "User already exists!!!";
                    }
                });
        }

        function back() {
            $rootScope.placeName = null;
            $location.url("/");
        }
    }
})();