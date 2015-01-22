(function() {
    angular.module("mrgApp").directive('jobs', ['JobsService', function(JobsService) {
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
                    JobsService.getJobsByIndex((scope.jobsCurrentPage - 1) * scope.numPerPage, scope.numPerPage, '').then(function(data) {
                        scope.jobs = data.rows;
                        scope.jobsNoOfPages = Math.ceil(data.total_rows / scope.numPerPage);
                    }, function(reason) {
                        alert(reason);
                    });
                }

                scope.deleteJob = function(job) {
                    JobsService.deleteJob(job);
                };

                scope.$watch('jobsCurrentPage', scope.loadData);
            }
        }
    }]);
}());