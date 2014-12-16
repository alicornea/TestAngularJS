(function () {
    var app = angular.module("mrgApp");
    app.directive('jobs', ['ProjectCouch', function (ProjectCouch) {

        return {

            restrict: 'E',

            scope: {
                groundTime: '='
            },
            replace: true,
            templateUrl: 'partials/Jobs/directives/jobs.html',

            link: function (scope, element, attributes) {
                console.log('muy shit right here');
                var promise = ProjectCouch.get({
                    q: '_design',
                    r: 'jobs',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',
                    limit: 1000
                });

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
    }]);
}());