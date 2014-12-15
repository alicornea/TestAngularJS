(function() {

    var app = angular.module("mrgApp");

    /**
     * Configure the Routes
     */
    app.config(['$routeProvider', 'USER_ROLES', function($routeProvider, USER_ROLES) {
        $routeProvider
        // Home
            .when("/", {
                templateUrl: "partials/home.html",
                controller: "DashboardCtrl"
            })
            // Pages
            .when("/about", {
                templateUrl: "partials/about.html",
                controller: "PageCtrl",
                authorizedRoles: [USER_ROLES.admin]
            })
            .when("/jobs", {
                templateUrl: "partials/jobs.html",
                controller: "JobsCtrl"
            })
            .when("/job/edit/:jobid", {
                templateUrl: "partials/job.html",
                controller: "JobCtrl"
            })
            .when("/job/new", {
                templateUrl: "partials/job.html",
                controller: "NewJobCtrl"
            })
            .when("/faq", {
                templateUrl: "partials/faq.html",
                controller: "PageCtrl"
            })
            .when("/pricing", {
                templateUrl: "partials/pricing.html",
                controller: "PageCtrl"
            })
            .when("/services", {
                templateUrl: "partials/services.html",
                controller: "PageCtrl"
            })
            .when("/contact", {
                templateUrl: "partials/contact.html",
                controller: "PageCtrl"
            })
            .when("/test", {
                templateUrl: "partials/test.html",
                controller: "TestCtrl"
            })
            .when("/test/edit/:actionid", {
                templateUrl: "partials/testedit.html",
                controller: "TestEditCtrl"
            })
            .when("/test/new", {
                templateUrl: "partials/testedit.html",
                controller: "TestNewCtrl"
            })

        //groundTime
        .when("/groundtime/new", {
                templateUrl: "partials/groundTime/newGroundTime.html",
                controller: "GroundTimeNewCtrl"
            })
            .when("/groundtime/edit/:id", {
                templateUrl: "partials/groundTime/newGroundTime.html",
                controller: "GroundTimeEditCtrl"
            })

        //actions
        .when("/actions", {
                templateUrl: "partials/action/list.html",
                controller: "ActionListCtrl"
            })
            .when("/action/edit/:actionid", {
                templateUrl: "partials/action/edit.html",
                controller: "ActionEditCtrl"
            })
            .when("/action/new/:complaintid", {
                templateUrl: "partials/action/edit.html",
                controller: "ActionNewCtrl"
            })
            .when("/action/delete/:actionid", {
                templateUrl: "partials/action/delete.html",
                controller: "ActionDeleteCtrl"
            })

        // Blog
        .when("/blog", {
                templateUrl: "partials/blog.html",
                controller: "BlogCtrl"
            })
            .when("/blog/post", {
                templateUrl: "partials/blog_item.html",
                controller: "BlogCtrl"
            })
            //Complaints
            .when("/Complaints", {
                templateUrl: "partials/complaints/Complaints.html",
                controller: "ComplaintsCtrl"
            })
            .when("/Complaint/Edit/:id", {
                templateUrl: "partials/complaints/ComplaintInput.html",
                controller: "ComplaintEditCtrl"
            })
            .when("/Complaint/Add", {
                templateUrl: "partials/complaints/ComplaintInput.html",
                controller: "ComplaintAddCtrl"
            })
            .when("/Complaint/:id", {
                templateUrl: "partials/complaints/Complaint.html",
                controller: "ComplaintCtrl"
            })
            // else 404
            .otherwise("/404", {
                templateUrl: "partials/404.html",
                controller: "PageCtrl"
            });
    }]);






}());
