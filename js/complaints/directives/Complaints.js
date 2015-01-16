(function() {
    angular.module("mrgApp").directive('complaints', ['$rootScope', 'ProjectCouch', 'ComplaintsService', function($rootScope, ProjectCouch, ComplaintsService) {
        return {
            restrict: 'E',
            scope: {
                groundtime: '@',
            },
            replace: true,
            templateUrl: 'partials/complaints/directives/Complaints.html',

            link: function(scope) {

                console.log('complaints directive loaded');

                scope.numPerPage = 10;
                scope.complaintsCurrentPage = 1;

                scope.loadData = function() {
                    ComplaintsService.getComplaintsByIndex((scope.complaintsCurrentPage - 1) * scope.numPerPage, scope.numPerPage, scope.groundtime, $rootScope.online).then(function(data) {
                        scope.complaints = data.rows;
                        scope.complaintsNoOfPages = Math.ceil(data.total_rows / scope.numPerPage);
                    }, function(reason) {
                        alert(reason);
                    });
                }

                scope.deleteComplaint = function(complaint) {
                    ComplaintsService.deleteComplaint(complaint, scope.online)
                };

                scope.$watch('complaintsCurrentPage', scope.loadData);
            }
        }
    }]);
}());