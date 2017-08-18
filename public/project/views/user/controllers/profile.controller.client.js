/**
 * Created by piyushgoel on 7/20/17.
 */
(function () {
    angular
        .module("TravelMate")
        .controller("profileController", profileController);

    function profileController(userService, $location, user, $rootScope, userReviewService, placeService) {
        var model = this;
        var userId = user._id;
        model.userRole = user.role;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.following = following;
        model.wishList = wishList;
        model.followers = followers;
        model.place = place;
        model.review = review;

        function init() {
            userService.findUserByUserId(userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }

        init();

        function updateUser(user) {
            if(!user.firstName || !user.lastName) {
                model.errorMessage = "Enter First and Last Name";
                return;
            }
            userService.updateUser(user._id, user)
                .then(function (response) {
                    model.user = response.data;
                });
            model.errorMessage = null;
        }

        function deleteUser(user) {
            userReviewService.deleteReviewByUser(user._id);

            // if(user.role === 'Host') {
            //     user.followers.forEach(function (value) {
            //         userService.removeFromFollowersList(user._id, value);
            //     });
            //     user.wishlist.forEach(function (value) {
            //         placeService.removeFromHostsList(user._id, value);
            //     });
            // } else if(user.role === 'Traveller') {
            //     user.following.forEach(function (value) {
            //         userService.removeFromFollowingList(user._id, value);
            //     });
            //     user.wishlist.forEach(function (value) {
            //         placeService.removeFromFollowersList(user._id, value);
            //     });
            // }

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

        function following(user) {
            if(!user.firstName || !user.lastName) {
                model.errorMessage = "Enter First and Last Name";
                return;
            }
            $rootScope.placeForHost = null;
            $location.url("/following");
        }

        function place(user) {
            if(!user.firstName || !user.lastName) {
                model.errorMessage = "Enter First and Last Name";
                return;
            }
            $rootScope.place = null;
            $location.url("/place");
        }

        function followers(user) {
            if(!user.firstName || !user.lastName) {
                model.errorMessage = "Enter First and Last Name";
                return;
            }
            $location.url("/followers");
        }

        function review(user) {
            if(!user.firstName || !user.lastName) {
                model.errorMessage = "Enter First and Last Name";
                return;
            }
            $location.url("/review");
        }

        function wishList(user) {
            if(!user.firstName || !user.lastName) {
                model.errorMessage = "Enter First and Last Name";
                return;
            }
            $location.url("/wishList");
        }
    }
})();