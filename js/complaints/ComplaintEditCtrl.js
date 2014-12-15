(function() {
    angular.module("mrgApp").controller('ComplaintEditCtrl', function($scope, $routeParams, ComplaintsService, DataService) {
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

        ComplaintsService.getComplaint($routeParams.id)
            .then(function(data) {
                $scope.complaint = data.rows[0];
            }, function(reason) {
                alert(reason);
            });

        $scope.saveComplaint = function() {
            ComplaintsService.updateComplaint($scope.complaint.doc);
        };
    });
}());
