(function() {
    angular.module("mrgApp").controller('ComplaintAddCtrl', function($scope, ComplaintsService, DataService) {
        $scope.Types = DataService.getComplaintTypes();
        $scope.Workgroups = DataService.getWorkgroups();

        $scope.saveComplaint = function() {
            ComplaintsService.saveComplaint($scope.complaint.doc);
        };
    });
}());
