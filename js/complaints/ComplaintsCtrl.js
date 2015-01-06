(function() {
    angular.module("mrgApp").controller('ComplaintsCtrl', function($scope, ComplaintsService) {
        var complaintsPerPage = 10;
        $scope.nextPageStartKey = '';
        $scope.prevPageStartKey = '';

        $scope.getComplaints = function(startKey) {
            ComplaintsService.getComplaints(startKey, complaintsPerPage).then(function(data) {
                if (data.rows.length > complaintsPerPage) { //we still have pages to show
                    $scope.nextPageStartKey = data.rows[complaintsPerPage].value._id;
                    data.rows.splice(-1, 1);
                }
                if (data.offset > 0) // not on first page
                    $scope.prevPageStartKey = $scope.complaints[0].value._id;//this will be the start key for the prev page
                $scope.complaints = data.rows;
                $scope.noOfComplaints = data.total_rows;
                $scope.offset = data.offset;
            }, function(reason) {
                alert(reason);
            });
        };

        $scope.deleteComplaint = function(complaint) {
            ComplaintsService.deleteComplaint(complaint, $scope.online)
        };

        $scope.getComplaints($scope.startKey, complaintsPerPage);
    });
}());
