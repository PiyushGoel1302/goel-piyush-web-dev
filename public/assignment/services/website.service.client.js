/**
 * Created by piyushgoel on 7/21/17.
 */
(function () {
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService($http) {

        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteByName = findWebsiteByName;
        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
        }

        function findWebsiteByName(name, userId) {
            var url = "/api/user/" + userId + "/website?websitename=" + name;
            return $http.get(url);
        }

        function createWebsite(website, userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website);
        }

        function findWebsiteById(wesbsiteId) {
            var url = "/api/website/" + wesbsiteId;
            return $http.get(url);
        }

        function updateWebsite(website) {
            var url = "/api/website/" + website._id;
            return $http.put(url, website);
        }

        function deleteWebsite(website, userId) {
            var url = "/api/user/" + userId + "/website/" + website._id;
            return $http.delete(url);
        }
    }
})();