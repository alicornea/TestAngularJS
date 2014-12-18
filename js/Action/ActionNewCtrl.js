(function () {

    var app = angular.module("mrgApp");

    var ActionNewCtrl = function ($scope, ProjectCouch, $location, $routeParams, ActionService, DateTime) {

        $scope.complaintId = $routeParams.complaintid;
        var promise = ActionService.GetStatuses();

        promise.$promise.then(function (data) {
            var statusesAction = [];
            for (i = 0; i < data.rows.length; i++)
                statusesAction.push(data.rows[i].doc.name);
            $scope.statuses = statusesAction;
            if (data.rows.length > 0)
                $scope.action.status = statusesAction[0];

        }, function (reason) {
            alert(JSON.stringify(reason));
        });


        $scope.save = function () {
            $scope.action.changeDate = DateTime.currentDateTime();
            $scope.action.createDate = DateTime.currentDateTime();


            ProjectCouch.save($scope.action, function (action) {
                $location.path('/actions');
            });
        }

        $scope.isClean = function () {
            return angular.equals(self.original, $scope.action);
        }

    };



    app.controller("ActionNewCtrl", ['$scope', 'ProjectCouch', '$location', '$routeParams', 'ActionService', 'DateTime', ActionNewCtrl]);

}());