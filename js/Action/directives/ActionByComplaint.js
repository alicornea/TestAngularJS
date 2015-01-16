(function() {
    angular.module("mrgApp").directive('complaintActions', ['$rootScope', 'ActionService', function($rootScope, ActionService) {

        return {
            restrict: 'E',
            scope: {
                complaintId: '='
            },
            replace: true,
            templateUrl: 'partials/action/directives/ActionsByComplaint.html',

            link: function(scope) {

                console.log('complaint actions directive loaded');

                scope.numPerPage = 10;
                scope.complaintActionsCurrentPage = 1;
                
                scope.loadData = function() {
                    ActionService.getActionsByComplaintIdByIndex(scope.complaintId, (scope.complaintActionsCurrentPage - 1) * scope.numPerPage, scope.numPerPage, $rootScope.online).then(function(data) {
                        scope.actions = data.rows;
                        scope.complaintActionsNoOfPages = Math.ceil(data.total_rows / scope.numPerPage);
                    }, function(reason) {
                        console.log(reason);
                    });
                }

                scope.$watch('complaintActionsCurrentPage', scope.loadData);
            }
        }
    }]);
}());