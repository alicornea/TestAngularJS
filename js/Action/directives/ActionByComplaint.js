(function() {
    angular.module("mrgApp").directive("complaintActions", ['ActionService', '$routeParams', function(ActionService, $routeParams) {

        return {
            restrict: 'E',
            scope: {
                complaintid: '='
            },
            templateUrl: 'partials/action/directives/Actions.html',
            link: function myLink(scope, elements, attributes) {
                var promise = (typeof scope.complaintid != "undefined") ? ActionService.GetActionsByComplaintId(scope.complaintid) : ActionService.GetAllActions();

                var ProcessData = function(data) {
                    scope.actions = data;
                };

                var ProcessError = function(reason) {
                    console.log(reason);
                };
                promise.$promise.then(ProcessData, ProcessError);
            }
        }
    }]);
}());