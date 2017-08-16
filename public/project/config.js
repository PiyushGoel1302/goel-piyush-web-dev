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
            .when("/place", {
                templateUrl: "views/place/templates/place-search.view.client.html",
                controller: "placeController",
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
            .when("/hostSearch", {
                templateUrl: "views/host-search/templates/host-search.view.client.html",
                controller: "hostSearchController",
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