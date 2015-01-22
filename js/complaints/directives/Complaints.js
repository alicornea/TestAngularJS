(function() {
    angular.module("mrgApp").directive('complaints', ['ComplaintsService', function(ComplaintsService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/complaints/directives/Complaints.html',

            link: function(scope) {
                scope.numPerPage = 10;
                scope.complaintsCurrentPage = 1;

                scope.loadData = function() {
                    ComplaintsService.getComplaintsByIndex((scope.complaintsCurrentPage - 1) * scope.numPerPage, scope.numPerPage).then(function(data) {
                        scope.complaints = data.rows;
                        scope.complaintsNoOfPages = Math.ceil(data.rows.length / scope.numPerPage);
                    }, function(reason) {
                        alert(reason);
                    });
                }

                scope.deleteComplaint = function(complaint) {
                    ComplaintsService.deleteComplaint(complaint)
                };

                scope.$watch('complaintsCurrentPage', scope.loadData);
            }
        }
    }]);
}());