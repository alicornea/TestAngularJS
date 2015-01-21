(function() {
    angular.module("mrgApp").controller("NewJobCtrl", ["$scope", "JobsService", function($scope, JobsService) {

        console.log("test newJobCtrl reporting for duty.");

        $scope.saveJob = function() {
            JobsService.saveJob($scope.job.value, $scope.online);
        };
    }]);
}());