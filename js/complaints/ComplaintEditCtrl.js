(function() {
    angular.module("mrgApp").controller('ComplaintEditCtrl', function($scope, $routeParams, ComplaintsService, DataService) {
      
        DataService.getComplaintTypes()
            .then(function(data) {
                $scope.Types = data.rows;
            }, function(reason) {
                console.log(reason);
            });

        DataService.getWorkgroups()
            .then(function(data) {
                $scope.Workgroups = data.rows;
            }, function(reason) {
                console.log(reason);
            });

        ComplaintsService.getComplaint($routeParams.id, $scope.online)
            .then(function(data) {
                $scope.complaint = data.rows[0];
            }, function(reason) {
                console.log(reason);
            });

        $scope.updateComplaint = function() {
           
            ComplaintsService.updateComplaint($scope.complaint.value, $scope.online);
        };
    });
}());
