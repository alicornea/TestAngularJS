(function () {

    var app = angular.module("tutorialWebApp");
        
    var JobsCtrl = function ($scope, ProjectCouch) {
        console.log("test Jobs reporting for duty.");
    };

    app.controller("JobsCtrl", ['$scope', 'ProjectCouch', JobsCtrl]);

}());