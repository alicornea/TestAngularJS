(function() {
    angular.module("mrgApp").directive('complaints', ['ComplaintsService', 'COMPLAINTS_SORTING_TYPES', function(ComplaintsService, COMPLAINTS_SORTING_TYPES) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/complaints/directives/Complaints.html',

            link: function(scope) {
                scope.numPerPage = 10;
                scope.complaintsCurrentPage = 1;
                scope.complaintsSortingTypes = COMPLAINTS_SORTING_TYPES;
                scope.sortingType = COMPLAINTS_SORTING_TYPES.byGroundTime;

                scope.loadData = function() {
                    ComplaintsService.getComplaintsByIndex((scope.complaintsCurrentPage - 1) * scope.numPerPage, scope.numPerPage).then(function(data) {
                        scope.complaints = data.rows;
                        scope.complaintsNoOfPages = Math.ceil(data.total_rows / scope.numPerPage);
                    }, function(reason) {
                        alert(reason);
                    });
                }
                
                scope.getComplaintsByFieldSorted = function (descendingSorting){
                    ComplaintsService.getComplaintsByFieldSorted(scope.sortingType, (scope.complaintsCurrentPage - 1) * scope.numPerPage, scope.numPerPage, descendingSorting).then(function(data) {
                        scope.complaints = data.rows;
                        scope.complaintsNoOfPages = Math.ceil(data.total_rows / scope.numPerPage);
                    }, function(reason) {
                        alert(reason);
                    });
                };

                scope.deleteComplaint = function(complaint) {
                    ComplaintsService.deleteComplaint(complaint)
                };

                scope.$watch('complaintsCurrentPage', scope.loadData);
            }
        }
    }]);
}());