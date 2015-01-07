(function() {
    angular.module("mrgApp").controller('ComplaintsCtrl', function($scope, ComplaintsService) {
        ComplaintsService.getComplaints($scope.online).then(function(data) {
            $scope.Complaints = data.rows;
        }, function(reason) {
            alert(reason);
        });

        $scope.deleteComplaint = function(complaint) {
            ComplaintsService.deleteComplaint(complaint,$scope.online)
        };
    });
}());
