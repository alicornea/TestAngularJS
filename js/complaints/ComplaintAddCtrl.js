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

            /*for(i=2000;i<20000;i++)
        {
console.log("add")
            ComplaintsService.saveComplaint({

                item :"complaint",
                refNo :"123456-"+i,
                text :"dummy" +i,
                type : "Type 2",
                workgroup : "Borkgroup B"
            });
        }*/
        
    }]);
}());
