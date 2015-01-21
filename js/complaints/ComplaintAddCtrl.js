(function() {
    angular.module("mrgApp").controller('ComplaintAddCtrl', ["$scope", "ComplaintsService", "DataService", "SessionStore", function($scope, ComplaintsService, DataService, SessionStore) {
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

            $scope.complaint.value.groundTimeId = SessionStore.selectedGroundTime();
            ComplaintsService.saveComplaint($scope.complaint.value, $scope.online);
        };
    }]);
}());
