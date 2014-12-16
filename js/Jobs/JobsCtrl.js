(function () {

    var app = angular.module("mrgApp");
    
    var JobsCtrl = function ($scope, $location, ProjectCouch) {
        console.log("Jobs reporting for duty.");
    };

    app.controller("JobsCtrl", ['$scope', '$location', 'ProjectCouch', JobsCtrl]);

}());