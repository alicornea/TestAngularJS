(function() {
    angular.module("mrgApp").controller("JobCtrl", ["$scope", "$rootScope", "JobsService", "$routeParams", function($scope, $rootScope, JobsService, $routeParams) {
        console.log("test Job Edit reporting for duty.");

        var self = this;

        JobsService.getJob($routeParams.jobid, $rootScope.online).then(function(data) {
            self.original = data.rows[0];
            $scope.job = angular.copy(self.original);

        }, function(reason) {
            console.log(reason);
        });

        $scope.isClean = function() {
            return angular.equals(self.original, $scope.job);
        }

        $scope.updateJob = function(job) {
            JobsService.updateJob(job.value, $rootScope.online);
        };
    }]);
}());