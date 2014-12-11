(function () {
    var app = angular.module("tutorialWebApp");

    var JobCtrl = function ($scope, ProjectCouch, $location, $routeParams) {
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
            $scope.job.date = getCurrentDate();
            $scope.job.update(function () {
                $location.path('/jobs');
            });
        };
        function getCurrentDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            var hh = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            hh = addZeroIfNecessary(hh);
            min = addZeroIfNecessary(min);
            sec = addZeroIfNecessary(sec);

            return today = mm + '/' + dd + '/' + yyyy + ' ' + hh + ":" + min + ":" + sec;
        };

        function addZeroIfNecessary(field) {
            if (!isNaN(field) && field < 10) {
                return field = "0" + field;
            }
            return field;
        };
    };

    app.controller("JobCtrl", ['$scope', 'ProjectCouch', "$location", "$routeParams", JobCtrl]);
}());