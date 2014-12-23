(function() {
    var app = angular.module("mrgApp");
    app.directive("accGround", ["ProjectCouch", "pouchFactory", "AuthService", function(ProjectCouch, pouchFactory, AuthService) {
        return {
            restrict: 'E',

            link: function($scope) {

                /*
                               var promise = ProjectCouch.get({
                                    q: '_design',
                                    r: 'groundTime',
                                    s: '_view',
                                    t: 'getAll',
                                    include_docs: 'true',

                                });
                                promise.$promise.then(function(data) {
                                    $scope.groundTimes = data.rows;
                                }, function(reason) {
                                    alert(reason);
                                });
                */
                var mapFunction = function(doc) {
                        if (doc.item == "groundTime")
                            emit(doc._id, doc);
                    }
                 
                
                pouchFactory.queryObject(mapFunction).then(function onSuccess(doc) {
                    $scope.groundTimes = doc.rows
                })




                $scope.updateGroundTime = function(groundTime) {
                    
                    $scope.$parent.$broadcast("groundTimeChange", groundTime.selectedGroundTime);
                }

            },


            templateUrl: 'partials/groundTime/directives/ddlGroundTime.html'

        }
    }]);
}());
