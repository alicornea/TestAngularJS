(function () {
    var app = angular.module("mrgApp");
    app.directive("activitiesComplaint", ['ActionService', activitiesComplaint]);

    function activitiesComplaint(ActionService) {

        function myLink(scope, elements, attributes) {
            console.log("complaint id = " + scope.complaintid);

            var promise = (typeof scope.complaintid != "undefined")
                ? ActionService.GetActionsByComplaintId(scope.complaintid)
                : ActionService.GetAllActions();

            var ProcessData = function (data) {
                scope.actions = data;
            };

            var ProcessError = function (reason) {
                alert(reason);
            };
            promise.$promise.then(ProcessData, ProcessError);
        }

        return {
            restrict: 'E',
            scope: {
                complaintid: "="
            },
            templateUrl: 'partials/Action/directives/action.html',
            link: myLink
        }
    };



}());