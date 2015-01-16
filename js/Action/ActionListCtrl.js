(function() {
    angular.module("mrgApp").controller("ActionListCtrl", ['$scope', '$rootScope', 'ActionService', function($scope, $rootScope, ActionService) {

        $scope.numPerPage = 10;
        $scope.actionsCurrentPage = 1;

        $scope.loadData = function() {
            ActionService.getActionsByIndex(($scope.actionsCurrentPage - 1) * $scope.numPerPage, $scope.numPerPage, $rootScope.online).then(function(data) {
                $scope.actions = data.rows;
                $scope.actionsNoOfPages = Math.ceil(data.total_rows / $scope.numPerPage);
            }, function(reason) {
                alert(reason);
            });
        }

        $scope.$watch('actionsCurrentPage', $scope.loadData);
    }]);
}());