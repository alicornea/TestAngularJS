/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [
  'ngRoute', 'ngResource',

  'constants'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', 'USER_ROLES', function ($routeProvider, USER_ROLES) {
    $routeProvider
      // Home
      .when("/", { templateUrl: "partials/home.html", controller: "PageCtrl" })
      // Pages
      .when("/about", { templateUrl: "partials/about.html", controller: "PageCtrl", authorizedRoles: [USER_ROLES.admin ] })
      .when("/jobs", { templateUrl: "partials/jobs.html", controller: "JobsCtrl" })
      .when("/job/edit/:jobid", { templateUrl: "partials/job.html", controller: "JobCtrl" })
      .when("/job/new", { templateUrl: "partials/job.html", controller: "NewJobCtrl" })
      .when("/faq", { templateUrl: "partials/faq.html", controller: "PageCtrl" })
      .when("/pricing", { templateUrl: "partials/pricing.html", controller: "PageCtrl" })
      .when("/services", { templateUrl: "partials/services.html", controller: "PageCtrl" })
      .when("/contact", { templateUrl: "partials/contact.html", controller: "PageCtrl" })
      .when("/test", { templateUrl: "partials/test.html", controller: "TestCtrl" })
      .when("/test/edit/:actionid", { templateUrl: "partials/testedit.html", controller: "TestEditCtrl" })
      .when("/test/new", { templateUrl: "partials/testedit.html", controller: "TestNewCtrl" })

      //groundTime
      .when("/groundtime/new", { templateUrl: "partials/groundTime/newGroundTime.html", controller: "GroundTimeNewCtrl" })
      .when("/groundtime/edit/:id", { templateUrl: "partials/groundTime/newGroundTime.html", controller: "GroundTimeEditCtrl" })

      //actions
      .when("/actions", { templateUrl: "partials/action/list.html", controller: "ActionListCtrl" })
      .when("/action/edit/:actionid", { templateUrl: "partials/action/edit.html", controller: "ActionEditCtrl" })
      .when("/action/new", { templateUrl: "partials/action/edit.html", controller: "ActionNewCtrl" })
      .when("/action/delete/:actionid", { templateUrl: "partials/action/delete.html", controller: "ActionDeleteCtrl" })

      // Blog
      .when("/blog", { templateUrl: "partials/blog.html", controller: "BlogCtrl" })
      .when("/blog/post", { templateUrl: "partials/blog_item.html", controller: "BlogCtrl" })
      //Complaints
      .when("/Complaints", { templateUrl: "partials/complaints/Complaints.html", controller: "ComplaintsCtrl"})
      .when("/Complaint/Edit/:id", { templateUrl: "partials/complaints/ComplaintInput.html", controller: "ComplaintEditCtrl"})
      .when("/Complaint/Add", { templateUrl: "partials/complaints/ComplaintInput.html", controller: "ComplaintAddCtrl"})
      .when("/Complaint/:id", { templateUrl: "partials/complaints/Complaint.html", controller: "ComplaintCtrl"})
      // else 404
      .otherwise("/404", { templateUrl: "partials/404.html", controller: "PageCtrl" });
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
    console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
    console.log("Page Controller reporting for duty.");

    // Activates the Carousel
    $('.carousel').carousel({
        interval: 5000
    });

    // Activates Tooltips for Social Links
    $('.tooltip-social').tooltip({
        selector: "a[data-toggle=tooltip]"
    })
});


