(function() {
    angular.module("mrgApp").controller('ComplaintAddCtrl', ["$scope", "ComplaintsService", "DataService", function($scope, ComplaintsService, DataService) {
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

        $scope.saveComplaint = function() {
            ComplaintsService.saveComplaint($scope.complaint.value, $scope.online);
        };
    }]);
}());
