(function () {
    var app = angular.module("mrgApp");
    app.directive("activitiesComplaint", ['ActionService','$routeParams', activitiesComplaint]);

    function activitiesComplaint(ActionService, $routeParams) {

        function myLink(scope, elements, attributes) {
          
            var promise = (typeof scope.complaintid != "undefined")
                ? ActionService.GetActionsByComplaintId(scope.complaintid)
                : ActionService.GetAllActions();

            var ProcessData = function (data) {
                scope.actions = data;
            };

            var ProcessError = function (reason) {
                console.log(reason);
            };
            promise.$promise.then(ProcessData, ProcessError);
        }

        return {
            restrict: 'E',
            scope: {
                complaintid: '='
            },
            templateUrl: 'partials/action/directives/action.html',
            link: myLink
        }
    };



}());