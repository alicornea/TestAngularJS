(function() {
    angular.module("mrgApp").controller('ComplaintCtrl', function($scope, $routeParams, ComplaintsService, DataService) {
        $scope.Types = DataService.getComplaintTypes();
        $scope.Workgroups = DataService.getWorkgroups();

        ComplaintsService.getComplaint($routeParams.id).then(function(data) {
            $scope.complaint = data.rows[0];
        }, function(reason) {
            alert(reason);
        });
    });
}());
