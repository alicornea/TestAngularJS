(function () {

    var NewJobCtrl = function ($scope, ProjectCouch, $location, $routeParams) {

        console.log("test newJobCtrl reporting for duty.");

        $scope.save = function () {
            ProjectCouch.save($scope.job, function (job) {
                $location.path('/jobs/');
            });
        };
    };

    app.controller("NewJobCtrl", ["$scope", "ProjectCouch", "$location", "$routeParams", NewJobCtrl])

}());