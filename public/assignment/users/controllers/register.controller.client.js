/**
 * Created by piyushgoel on 7/21/17.
 */
(function () {
    angular
        .module("WamApp")
        .controller("registerController", registerController);
    
    function registerController(userService, $location) {
        var model = this;
        
        model.registerUser = registerUser;
        
        function init() {
            
        }
        init();

        function registerUser(user) {
            if(!user.username) {
                model.errorMessage = "Enter username and password to register";
                return;
            }
            var _user = userService.findUserByUsername(user);
            if(!_user) {
                if(user.password === user.password2) {
                    var user = userService.registerUser(user);
                    $location.url("/profile/" + user._id);
                } else {
                    model.errorMessage = "Password Verification Failed!!!";
                }
            } else {
                model.errorMessage = "User already exists!!!";
            }
        }
    }
})();