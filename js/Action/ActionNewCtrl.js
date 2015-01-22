(function() {

    angular.module("mrgApp").controller("ActionNewCtrl", ['$scope', '$routeParams', 'ActionService', 'DataService', 'LocalStore', function($scope, $routeParams, ActionService, DataService, LocalStore) {

        $scope.complaintId = $routeParams.complaintid;
        $scope.username = getUsername();

        DataService.getActionStatuses().then(function(data) {
            $scope.statuses = [];
            for (var i = 0; i < data.rows.length; i++)
                $scope.statuses.push(data.rows[i].value.name);
            if (data.rows.length > 0)
                $scope.action.status = $scope.statuses[0];
        }, function(reason) {
            console.log(reason);
        });

        $scope.saveAction = function() {
            ActionService.saveAction($scope.action.value, $scope.online);
        }

        function getUsername() {
            var userInfo = LocalStore.userInfo();

            return userInfo != null ? userInfo.username : "Anonymous";
        }
    }]);
}());