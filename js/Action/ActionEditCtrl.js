(function () {

    var app = angular.module("mrgApp");

    var ActionEditCtrl = function ($scope, ProjectCouch, $location , $routeParams ) {
         var self = this;
         ProjectCouch.get({q: $routeParams.actionid}, function(action) {
            self.original = action;
            $scope.action = new ProjectCouch(self.original);
         });


          $scope.save = function() {
            $scope.action.changeDate = getCurrentDate();
            $scope.action.update(function() {
                $location.path('/actions');
            });
          };

        function getCurrentDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            var hh = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            hh = addZeroIfNecessary(hh);
            min = addZeroIfNecessary(min);
            sec = addZeroIfNecessary(sec);

            return today = mm + '/' + dd + '/' + yyyy + ' ' + hh + ":" + min + ":" + sec;
        };


        function addZeroIfNecessary(field) {
            if(!isNaN(field) && field < 10)
            {
                return field = "0" + field;
            }
            return field;
        };


    };

    app.controller("ActionEditCtrl", ['$scope', 'ProjectCouch', '$location', '$routeParams', ActionEditCtrl]);

}());