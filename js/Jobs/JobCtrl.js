(function() {
    angular.module("mrgApp").controller("JobCtrl", ["$scope", "JobsService", "$routeParams", function($scope, JobsService, $routeParams) {
        var self = this;

        JobsService.getJob($routeParams.jobid, $scope.online).then(function(data) {
            self.original = data.rows[0];
            $scope.job = angular.copy(self.original);

        }, function(reason) {
            console.log(reason);
        });

        $scope.isClean = function() {
            return angular.equals(self.original, $scope.job);
        }

        $scope.updateJob = function() {
            JobsService.updateJob($scope.job.value, $scope.online);
        };
    }]);
}());