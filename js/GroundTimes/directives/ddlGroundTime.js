(function() {
    var app = angular.module("mrgApp");
    app.directive("accGround", ["$rootScope", "storageSrv", "AuthService", "SessionStore", function($rootScope, storageSrv, AuthService, SessionStore) {
        return {
            restrict: 'E',

            link: function($scope) {

                var mapFunction = function(doc) {
                    if (doc.item == "groundTime")
                        emit(doc._id, doc);
                }

                storageSrv.select('_design/groundTime/_view/getAll', $scope.online, null, true).then(function(data) {
                    $scope.groundTimes = data.rows;
                })

                $scope.updateGroundTime = function(groundTime) {

                    $scope.$parent.$broadcast("groundTimeChange", groundTime.selectedGroundTime);
                }

                $scope.$on('groundTimeChange', function(ev, rec) {
                    SessionStore.selectedGroundTime(rec.id)
                    $scope.selectedGroundtime = rec;
                });

                $scope.startSync = function() {
                    $rootScope.syncStarted = true;
                    var promise = storageSrv.sync().then(function(err, data) {
                        $rootScope.syncStarted = false;
                        console.log("sync if finish")
                    })


                }

            },

            templateUrl: 'partials/groundTime/directives/ddlGroundTime.html'
        }
    }]);
}());
