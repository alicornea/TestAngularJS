(function () {

    var app = angular.module("mrgApp");

    var ActionEditCtrl = function ($scope, ProjectCouch, $location, $routeParams, ActionService, DateTime) {
         var self = this;
 
         var promise = ActionService.GetStatuses();

         promise.$promise.then(function (data) {
             var statuses = [];
             for (i = 0; i < data.rows.length; i++)
                 statuses.push(data.rows[i].value.name);

             $scope.statuses = statuses;
         }, function (reason) {
             console.log(JSON.stringify(reason));
         });

         ProjectCouch.get({q: $routeParams.actionid}, function(action) {
            self.original = action;
            $scope.action = new ProjectCouch(self.original);
         });
   


          $scope.save = function() {
            $scope.action.changeDate = DateTime.currentDateTime();
            $scope.action.update(function() {
                $location.path('/actions');
            });
          };

           $scope.isClean = function () {
              return angular.equals(self.original, $scope.action);
          }

    };



    app.controller("ActionEditCtrl", ['$scope', 'ProjectCouch', '$location', '$routeParams', 'ActionService', 'DateTime', ActionEditCtrl]);

}());