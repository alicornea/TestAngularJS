(function() {
    angular.module("mrgApp").controller("ActionListCtrl", ['$scope', 'ActionService', function($scope, ActionService) {

        $scope.numPerPage = 10;
        $scope.actionsCurrentPage = 1;

        $scope.loadData = function() {
            ActionService.getActionsByIndex(($scope.actionsCurrentPage - 1) * $scope.numPerPage, $scope.numPerPage).then(function(data) {
                $scope.actions = data.rows;
                $scope.actionsNoOfPages = Math.ceil(data.rows.length / $scope.numPerPage);
            }, function(reason) {
                alert(reason);
            });
        }

        $scope.$watch('actionsCurrentPage', $scope.loadData);
    }]);
}());