(function () {

    var app = angular.module("mrgApp");

    var ActionNewCtrl = function ($scope, ProjectCouch, $location, $routeParams, ActionService, DateTime, LocalStore) {

        $scope.complaintId = $routeParams.complaintid;
        $scope.username = getUsername();
        
        var promise = ActionService.GetStatuses();

        promise.$promise.then(function (data) {
            var statusesAction = [];
            for (var i = 0; i < data.rows.length; i++)
                statusesAction.push(data.rows[i].value.name);
            $scope.statuses = statusesAction;
            if (data.rows.length > 0)
                $scope.action.status = statusesAction[0];

        }, function (reason) {
            console.log(JSON.stringify(reason));
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
        
        function getUsername()
        {
            var userInfo = LocalStore.userInfo();
            if( userInfo != null)
                return userInfo.username;
            return "Anonymous";    
        }

    };



    app.controller("ActionNewCtrl", ['$scope', 'ProjectCouch', '$location', '$routeParams', 'ActionService', 'DateTime', 'LocalStore', ActionNewCtrl]);

}());