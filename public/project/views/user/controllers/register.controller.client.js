
(function () {
    angular
        .module("TravelMate")
        .controller("registerController", registerController);
    
    function registerController(userService, $location) {
        var model = this;
        
        model.createUser = createUser;
        
        function init() {
            
        }
        init();

        function createUser(user) {
            if(!user) {
                model.errorMessage = "Enter username and password to register";
                return;
            }
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if (_user === null) {
                        if (user.password === user.password2) {
                            userService.createUser(user)
                                .then(function (response) {
                                    var newuser = response.data;
                                    userService.login(newuser.username, newuser.password)
                                        .then(function (response) {
                                            _user = response.data;
                                            if(_user === null) {
                                                model.errorMessage = "Invalid username and password!!!";
                                            } else {
                                                $location.url("/profile");
                                            }
                                        });
                                });
                        } else {
                            model.errorMessage = "Password Verification Failed!!!";
                        }
                    } else {
                        model.errorMessage = "User already exists!!!";
                    }
                });
        }
    }
})();