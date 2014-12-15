(function () {

    var app = angular.module("tutorialWebApp");

     var ActionNewCtrl = function ($scope, ProjectCouch, $location, $routeParams, Activities, DateTime) {
        
        $scope.complaintId = $routeParams.complaintid;
        $scope.statuses = Activities.statuses;
        
        $scope.save = function()
        {
            $scope.action.changeDate = DateTime.currentDateTime();
            $scope.action.createDate = DateTime.currentDateTime();
          

            ProjectCouch.save($scope.action, function (action) {
                $location.path('/actions');
            });
        }

    };



    app.controller("ActionNewCtrl", ['$scope', 'ProjectCouch', '$location','$routeParams', 'Activities', 'DateTime',ActionNewCtrl]);

}());