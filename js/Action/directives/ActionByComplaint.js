(function() {
    angular.module("mrgApp").directive('complaintActions', ['ActionService', function(ActionService) {

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
                    ActionService.getActionsByComplaintIdByIndex(scope.complaintId, (scope.complaintActionsCurrentPage - 1) * scope.numPerPage, scope.numPerPage).then(function(data) {
                        scope.actions = data.rows;
                        scope.complaintActionsNoOfPages = Math.ceil(data.total_rows / scope.numPerPage);
                    }, function(reason) {
                        console.log(reason);
                    });
                }
                
                scope.deleteAction = function(action) {
                    ActionService.deleteAction(action)
                };

                scope.$watch('complaintActionsCurrentPage', scope.loadData);
            }
        }
    }]);
}());