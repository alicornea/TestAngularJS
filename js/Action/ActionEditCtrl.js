(function () {

    var app = angular.module("mrgApp");

    var ActionEditCtrl = function ($scope, ProjectCouch, $location , $routeParams, Activities, DateTime ) {
         var self = this;
         
         ProjectCouch.get({q: $routeParams.actionid}, function(action) {
            self.original = action;
            $scope.action = new ProjectCouch(self.original);
         });
   
          $scope.statuses = Activities.statuses;

          $scope.save = function() {
            $scope.action.changeDate = DateTime.currentDateTime();
            $scope.action.update(function() {
                $location.path('/actions');
            });
          };


    };

    app.controller("ActionEditCtrl", ['$scope', 'ProjectCouch', '$location', '$routeParams', 'Activities', 'DateTime', ActionEditCtrl]);

}());