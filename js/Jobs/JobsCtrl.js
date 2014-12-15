(function () {

    var app = angular.module("mrgApp");
    
    var JobsCtrl = function ($scope, $location, ProjectCouch) {
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

        $scope.deleteJob = function (job) {
            new ProjectCouch(job).destroy(function () {
                $location.path("/jobs/")
            });
        };
    };

    app.controller("JobsCtrl", ['$scope', '$location', 'ProjectCouch', JobsCtrl]);

}());