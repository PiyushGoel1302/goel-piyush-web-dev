/**
 * Created by piyushgoel on 7/22/17.
 */
(function () {
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService($http) {

        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageByName = findPageByName;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        function findPageByName(pagename, websiteId) {
            var url = "/api/website/" + websiteId + "/page?pagename=" + pagename;
            return $http.get(url);
        }

        function createPage(page, websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function updatePage(page) {
            var url = "/api/page/" + page._id;
            return $http.post(url, page);
        }

        function deletePage(page) {
            var url = "/api/page/" + page._id;
            return $http.delete(url);
        }
    }
})();