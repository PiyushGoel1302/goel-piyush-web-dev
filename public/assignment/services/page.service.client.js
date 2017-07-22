/**
 * Created by piyushgoel on 7/22/17.
 */
(function () {
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService() {
        var pages = [
                {
                    _id: "321",
                    name: "Post 1",
                    websiteId: "456",
                    description: "Lorem"
                },
                {
                    _id: "432",
                    name: "Post 2",
                    websiteId: "456",
                    description: "Lorem"
                },
                {
                    _id: "543",
                    name: "Post 3",
                    websiteId: "456",
                    description: "Lorem"
                }
            ];

        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageByName = findPageByName;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        function findPageByWebsiteId(wid) {
            var _pages = [];
            for(var p in pages) {
                if(pages[p].websiteId === wid) {
                    _pages.push(pages[p]);
                }
            }
            return _pages;
        }

        function findPageByName(name, wid) {
            for(var p in pages) {
                if(pages[p].websiteId === wid && pages[p].name === name) {
                    return pages[p].name;
                }
            }
            return false;
        }

        function createPage(page, wid) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = wid;
            pages.push(page);
        }

        function findPageById(pid, wid) {
            for(var p in pages) {
                if(pages[p].websiteId === wid && pages[p]._id === pid) {
                    return pages[p];
                }
            }
        }

        function updatePage(page, wid) {
            for(var p in pages) {
                if(pages[p].websiteId === wid && pages[p]._id === page._id) {
                    pages[p] = page;
                }
            }
        }

        function deletePage(page, wid) {
            for(var p in pages) {
                if(pages[p].websiteId === wid && pages[p]._id === page._id) {
                    delete pages[p];
                }
            }
        }
    }
})();