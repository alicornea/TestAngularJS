(function () {

    //var app = angular.module("tutorialWebApp");
    
    var JobsCtrl = function ($scope, ProjectCouch) {
        console.log("test Jobs reporting for duty.");

        var promise = ProjectCouch.get({
            q: '_design',
            r: 'jobs',
            s: '_view',
            t: 'getAll',
            include_docs: 'true',
            limit: 1000
        });

        var ProcessData = function (data) {
            $scope.jobs = data;
        };

        var ProcessError = function (reason) {
            alert(reason);
        };

        promise.$promise.then(ProcessData, ProcessError);
    };

    app.controller("JobsCtrl", ['$scope', 'ProjectCouch', JobsCtrl]);

}());