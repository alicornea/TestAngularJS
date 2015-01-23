(function() {
    angular.module("mrgApp").controller("ActionEditCtrl", ['$scope', '$routeParams', 'ActionService', 'DataService', function($scope, $routeParams, ActionService, DataService) {
        var self = this;
        $scope.complaintId = $routeParams.complaintid;

        DataService.getActionStatuses().then(function(data) {
            $scope.statuses = [];
            for (var i = 0; i < data.rows.length; i++)
                $scope.statuses.push(data.rows[i].value.name);
            if (data.rows.length > 0)
                $scope.action.status = $scope.statuses[0];
        }, function(reason) {
            console.log(reason);
        });

        ActionService.getAction($routeParams.actionid, $scope.online).then(function(data) {
            self.original = data.rows[0];
            $scope.action = angular.copy(self.original);

        }, function(reason) {
            console.log(reason);
        });

        $scope.isClean = function() {
            return angular.equals(self.original, $scope.action);
        }

        $scope.updateAction = function() {
            ActionService.updateAction($scope.action.value, $scope.online);
        };
    }]);
}());