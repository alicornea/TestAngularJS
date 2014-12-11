(function () {
    var app = angular.module("tutorialWebApp");

    var NewJobCtrl = function ($scope, ProjectCouch, $location, $routeParams) {

        console.log("test newJobCtrl reporting for duty.");

        //$scope.job.profession = "Accountant";

        $scope.save = function () {
            $scope.job.date = getCurrentDate();
            ProjectCouch.save($scope.job, function (job) {
                $location.path('/jobs');
            });
        };

        function getCurrentDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            return today = mm + '/' + dd + '/' + yyyy;
        };
    };

    app.controller("NewJobCtrl", ["$scope", "ProjectCouch", "$location", "$routeParams", NewJobCtrl])

}());