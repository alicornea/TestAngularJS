(function() {
    angular.module("mrgApp").directive('jobs', ['$rootScope', 'JobsService', function($rootScope, JobsService) {
        return {
            restrict: 'E',
            scope: {
                groundtime: '@'
            },
            replace: true,
            templateUrl: 'partials/Jobs/directives/jobs.html',

            link: function(scope) {

                console.log('jobs directive link loaded');

                scope.numPerPage = 10;
                scope.jobsCurrentPage = 1;

                scope.loadData = function() {
                    JobsService.getJobsByIndex((scope.jobsCurrentPage - 1) * scope.numPerPage, scope.numPerPage, '', $rootScope.online).then(function(data) {
                        scope.jobs = data.rows;
                        scope.jobsNoOfPages = Math.ceil(data.total_rows / scope.numPerPage);
                    }, function(reason) {
                        alert(reason);
                    });
                }

                scope.deleteJob = function(job) {
                    JobsService.deleteJob(job, $rootScope.online);
                };

                scope.$watch('jobsCurrentPage', scope.loadData);
            }
        }
    }]);
}());