(function() {
    angular.module("mrgApp").controller('ComplaintAddCtrl', function($scope, ComplaintsService, DataService) {
        DataService.getComplaintTypes()
            .then(function(data) {
                $scope.Types = data.rows;

            }, function(reason) {
                alert(reason);
            });

        DataService.getWorkgroups()
            .then(function(data) {
                $scope.Workgroups = data.rows;
            }, function(reason) {
                alert(reason);
            });

        $scope.saveComplaint = function() {
            ComplaintsService.saveComplaint($scope.complaint.value);
        };
    });
}());
