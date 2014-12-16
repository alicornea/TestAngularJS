(function () {
    var app = angular.module("mrgApp");
    
    var Jobs = function (ProjectCouch, JobService) {

        return {

            restrict: 'E',

            scope: {
                groundtime: '='
            },
            replace: true,
            templateUrl: 'partials/Jobs/directives/jobs.html',

            link: function (scope, element, attributes) {
                console.log('muy shit right here');
                
                var promise = new JobService.GetDesiredJob(scope.groundtime);
                

                var ProcessData = function (data) {
                    scope.jobs = data;
                };

                var ProcessError = function (reason) {
                    alert(reason);
                };

                promise.$promise.then(ProcessData, ProcessError);

                scope.deleteJob = function (job) {
                    new ProjectCouch(job).destroy(function () {
                        $location.path("/jobs/")
                    });
                };
            }

            //controller: JobsController(ProjectCouch, $scope)
        }
    }    
    
    app.directive('jobs', ['ProjectCouch', 'JobService', Jobs]);
}());