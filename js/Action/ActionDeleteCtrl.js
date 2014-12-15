(function () {

    var app = angular.module("mrgApp");

    var ActionDeleteCtrl = function ($scope, ProjectCouch, $location , $routeParams ) {
         var self = this;
         ProjectCouch.get({q: $routeParams.actionid}, function(action) {
            self.original = action;
            $scope.action = new ProjectCouch(self.original);
         });
        
          $scope.destroy = function() {
            self.original.destroy(function() {
                $location.path('/actions');
             });
          };

    };

    app.controller("ActionDeleteCtrl", ['$scope', 'ProjectCouch', '$location', '$routeParams', ActionDeleteCtrl]);

}());