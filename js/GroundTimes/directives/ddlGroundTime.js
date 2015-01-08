(function() {
    var app = angular.module("mrgApp");
    app.directive("accGround", ["ProjectCouch", "storageSrv", "AuthService", function(ProjectCouch, storageSrv, AuthService) {
        return {
            restrict: 'E',

            link: function($scope) {

                var mapFunction = function(doc) {
                        if (doc.item == "groundTime")
                            emit(doc._id, doc);
                    }
                 
                storageSrv.select('_design/groundTime/_view/getAll', $scope.online, null, true).then(function(data){
                    $scope.groundTimes = data.rows;
                })

                $scope.updateGroundTime = function(groundTime) {
                    
                    $scope.$parent.$broadcast("groundTimeChange", groundTime.selectedGroundTime);
                }

            },

            templateUrl: 'partials/groundTime/directives/ddlGroundTime.html'
        }
    }]);
}());
