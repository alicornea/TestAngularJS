(function() {
    angular.module("mrgApp").controller('ComplaintsCtrl', function($scope, ComplaintsService) {
        $scope.complaintsPerPage = 10;
        $scope.numberOfPages = 0;
        $scope.currentPage = 1;
        $scope.nextPageStartKey = '';
        $scope.prevPageStartKeys = [];
        $scope.pages = [];

        $scope.getComplaints = function(key, nextPage) { //nextPage - true if e move to next page false if we go to the prev page
            if (nextPage) //store the start key for the prev page
                if ($scope.offset !== undefined) //we are on the first page
                    $scope.prevPageStartKeys.push($scope.complaints[0].value._id);

            ComplaintsService.getComplaints(key, $scope.complaintsPerPage).then(function(data) {

                if (nextPage) { //we will get the results for the next page
                    if (data.rows.length > $scope.complaintsPerPage) { //we still have pages to show
                        $scope.nextPageStartKey = data.rows[$scope.complaintsPerPage].value._id;
                        data.rows.splice(-1, 1);
                    }
                }
                else { //we will get the results for prev page
                    $scope.nextPageStartKey = data.rows[$scope.complaintsPerPage].value._id;
                    data.rows.splice(-1, 1);
                }

                parseResponse(data);

            }, function(reason) {
                alert(reason);
            });
        };

        $scope.getComplaintsByPageIndex = function(pageIndex) {
            if (pageIndex < 0)
                pageIndex = 0;
            if ($scope.numberOfPages > 0)
                if (pageIndex > $scope.numberOfPages - 1)
                    pageIndex = $scope.numberOfPages - 1;
            ComplaintsService.getComplaintsByIndex(pageIndex * $scope.complaintsPerPage).then(function(data) {
                parseResponse(data);
            }, function(reason) {
                alert(reason);
            });
        }

        $scope.deleteComplaint = function(complaint) {
            ComplaintsService.deleteComplaint(complaint, $scope.online)
        };

        $scope.isPrevPage = function() {
            return $scope.offset == 0;
        }

        $scope.isNextPage = function() {
            return $scope.numberOfComplaints - $scope.offset < $scope.complaintsPerPage;
        }

        function parseResponse(data) {
            $scope.complaints = data.rows;
            $scope.numberOfComplaints = data.total_rows;
            $scope.offset = data.offset;
            $scope.numberOfPages = Math.floor($scope.numberOfComplaints / $scope.complaintsPerPage) + 1;
            if ($scope.numberOfPages > 5) {
                $scope.currentPage = Math.floor($scope.offset / $scope.complaintsPerPage) + 1;
                $scope.pages = [];
                if ($scope.currentPage < 4) {
                    $scope.pages.push(1);
                    $scope.pages.push(2);
                    $scope.pages.push(3);
                    $scope.pages.push(4);
                    $scope.pages.push(5);
                    $scope.pages.push("+");
                }
                else if ($scope.currentPage > $scope.numberOfPages - 2) {
                    $scope.pages.push("-");
                    $scope.pages.push($scope.numberOfPages - 5);
                    $scope.pages.push($scope.numberOfPages - 4);
                    $scope.pages.push($scope.numberOfPages - 3);
                    $scope.pages.push($scope.numberOfPages - 2);
                    $scope.pages.push($scope.numberOfPages - 1);
                    $scope.pages.push($scope.numberOfPages);
                }
                else {
                    $scope.pages.push("-");
                    $scope.pages.push($scope.currentPage - 2);
                    $scope.pages.push($scope.currentPage - 1);
                    $scope.pages.push($scope.currentPage);
                    $scope.pages.push($scope.currentPage + 1);
                    $scope.pages.push($scope.currentPage + 2);
                    $scope.pages.push("+");
                }
            }
        }

        $scope.getComplaintsByPageIndex(10);
    });
}());
