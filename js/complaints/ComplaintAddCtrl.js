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
    });
}());
