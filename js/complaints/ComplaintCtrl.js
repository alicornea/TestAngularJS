(function() {
    angular.module("mrgApp").controller('ComplaintCtrl', ['$scope', '$routeParams', 'ComplaintsService', 'DataService', function($scope, $routeParams, ComplaintsService, DataService) {

        $scope.currentComplaintId = $routeParams.id;
        ComplaintsService.getComplaint($routeParams.id, $scope.online).then(function(data) {

            $scope.complaint = data.rows[0];

        }, function(reason) {
            console.log(reason);
        });
    }]);
}());
