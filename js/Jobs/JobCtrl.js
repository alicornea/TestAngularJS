(function () {
    var JobCtrl = function ($scope, ProjectCouch, $location, $routeParams) {
        console.log("test Job Edit reporting for duty.");

        var self = this;

        ProjectCouch.get({ q: $routeParams.actionid }, function (job) {
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
            $scope.job.update(function () {
                $location.path('/jobs');
            });
        };
    };

    app.controller("JobCtrl", ['$scope', 'ProjectCouch', "$location", "$routeParams", JobCtrl]);
}());