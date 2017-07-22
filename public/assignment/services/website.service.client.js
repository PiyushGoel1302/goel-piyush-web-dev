/**
 * Created by piyushgoel on 7/21/17.
 */
(function () {
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService() {
        var websites = [
            {
                _id: "123",
                name: "Facebook",
                developerId: "456",
                description: "Lorem"
            },
            {
                _id: "234",
                name: "Tweeter",
                developerId: "456",
                description: "Lorem"
            },
            {
                _id: "456",
                name: "Gizmodo",
                developerId: "456",
                description: "Lorem"
            },
            {
                _id: "890",
                name: "Go",
                developerId: "123",
                description: "Lorem"
            },
            {
                _id: "567",
                name: "Tic Tac Toe",
                developerId: "123",
                description: "Lorem"
            },
            {
                _id: "678",
                name: "Checkers",
                developerId: "123",
                description: "Lorem"
            },
            {
                _id: "789",
                name: "Chess",
                developerId: "234",
                description: "Lorem"
            }
        ];

        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteByName = findWebsiteByName;
        this.addWebsite = addWebsite;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function findWebsitesByUser(userId) {
            var sites = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function findWebsiteByName(name, userId) {
            for(var w in websites) {
                if(websites[w].name === name && websites[w].developerId === userId) {
                    return websites[w].name;
                }
            }
            return false;
        }

        function addWebsite(website, userId) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            websites.push(website);
        }

        function findWebsiteById(wid, userId) {
            for(var w in websites) {
                if(websites[w].developerId === userId && websites[w]._id === wid) {
                    return websites[w];
                }
            }
        }

        function updateWebsite(website, userId) {
            for(var w in websites) {
                if(websites[w].developerId === userId && websites[w]._id === website._id) {
                    websites[w] = website;
                }
            }
        }

        function deleteWebsite(website, userId) {
            for(var w in websites) {
                if(websites[w].developerId === userId && websites[w]._id === website._id) {
                    delete websites[w];
                }
            }
        }
    }
})();