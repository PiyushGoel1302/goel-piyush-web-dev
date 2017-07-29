/**
 * Created by piyushgoel on 7/21/17.
 */
(function () {
    angular
        .module("WamApp")
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
                    if (_user === "0") {
                        if (user.password === user.password2) {
                            userService.createUser(user)
                                .then(function (response) {
                                    var newuser = response.data;
                                    $location.url("/profile/" + newuser._id);
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