(function () {
    var app = angular.module("mrgApp");

    var JobCtrl = function ($scope, ProjectCouch, $location, $routeParams, DateTime) {
        console.log("test Job Edit reporting for duty.");

        var self = this;

        ProjectCouch.get({ q: $routeParams.jobid }, function (job) {
            self.original = job;
            $scope.job = new ProjectCouch(self.original);
        });

        $scope.isClean = function () {
            return angular.equals(self.original, $scope.job);
        }

        $scope.destroy = function () {
            self.original.destroy(function () {
                $location.path('/jobs');
            });
        };

        $scope.save = function () {
            $scope.job.date = DateTime.currentDateTime();
            $scope.job.update(function () {
                $location.path('/jobs');
            });
        };
    };

    app.controller("JobCtrl", ['$scope', 'ProjectCouch', "$location", "$routeParams", "DateTime", JobCtrl]);
}());