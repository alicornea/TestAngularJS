(function () {
    var app = angular.module("mrgApp");
    app.directive("activitiesComplaint", ['ActionService','$routeParams', activitiesComplaint]);

    function activitiesComplaint(ActionService, $routeParams) {

        function myLink(scope, elements, attributes) {
           var complaintid = $routeParams.id;
            console.log("complaint id2 = " + complaintid );

            var promise = (typeof complaintid != "undefined")
                ? ActionService.GetActionsByComplaintId(complaintid)
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

            templateUrl: 'partials/action/directives/action.html',
            link: myLink
        }
    };



}());