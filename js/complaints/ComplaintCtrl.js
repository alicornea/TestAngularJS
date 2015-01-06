(function() {
    angular.module("mrgApp").controller('ComplaintCtrl', function($scope, $routeParams, ComplaintsService, DataService) {
        $scope.currentComplaintId =  $routeParams.id; 
        
        ComplaintsService.getComplaint($routeParams.id).then(function(data) {
            $scope.complaint = data.rows[0];
           
        }, function(reason) {
            alert(reason);
        });
    });
}());
