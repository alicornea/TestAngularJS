(function(){
    var app= angular.module("mrgApp");
    app.directive("accGround", ["ProjectCouch", function(ProjectCouch) {
    return {
        restrict: 'E',

        link: function($scope) {


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

            $scope.updateGroundTime = function(groundTime) {
                //$scope.groundTimeChange({arg1 : groundTime.selectedGroundTime});
                $scope.$parent.$broadcast("groundTimeChange", groundTime.selectedGroundTime);
            }

        },


        templateUrl: 'partials/groundTime/directives/ddlGroundTime.html'

    }
}]);
}());