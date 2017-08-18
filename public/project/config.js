/**
 * Created by piyushgoel on 8/11/17.
 */
(function () {
    angular
        .module("TravelMate")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/venue/:venueId", {
                templateUrl: "views/home/templates/details.view.client.html",
                controller: "detailsController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/adminProfile", {
                templateUrl: "views/user/templates/admin.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/newprofile", {
                templateUrl: "views/user/templates/new-profile.view.client.html",
                controller: "newProfileController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/place", {
                templateUrl: "views/place/templates/place-search.view.client.html",
                controller: "placeController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/place/:placeId", {
                templateUrl: "views/place/templates/place-details.view.client.html",
                controller: "placeDetailsController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/wishList", {
                templateUrl: "views/wishlist/templates/wish-list.view.client.html",
                controller: "wishListController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/followers", {
                templateUrl: "views/follow/templates/followers.view.client.html",
                controller: "followersController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/following", {
                templateUrl: "views/follow/templates/following.view.client.html",
                controller: "followingController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/host/:hostId", {
                templateUrl: "views/follow/templates/host-details.view.client.html",
                controller: "hostDetailsController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/follower/:followerId", {
                templateUrl: "views/follow/templates/follower-details.view.client.html",
                controller: "followersDetailsController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/review", {
                templateUrl: "views/reviews/templates/review.view.client.html",
                controller: "reviewController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/givenReview", {
                templateUrl: "views/reviews/templates/given-review.view.client.html",
                controller: "reviewController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/review/:userId", {
                templateUrl: "views/reviews/templates/user-review.view.client.html",
                controller: "userReviewController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/placeReview/:placeId", {
                templateUrl: "views/place/templates/place-review.view.client.html",
                controller: "placeReviewController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
    }

    function checkLogin(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkLogin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url("/login");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();