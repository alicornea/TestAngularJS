(function () {

    var app = angular.module("tutorialWebApp");


    var ActionListCtrl = function ($scope, ProjectCouch) {

        var promise = ProjectCouch.get({
            q: '_design',
            r: '_actions',
            s: '_view',
            t: 'getAll',
            include_docs: 'true',
            limit: 10
        });
        promise.$promise.then(function (data) {
            $scope.actions = data;
            //alert(JSON.stringify(data))
        }, function (reason) {
            alert(reason);
        });

    };

    var ActionNewCtrl = function ($scope, ProjectCouch, $location) {
        console.log("new action");
        
        $scope.save = function()
        {
            $scope.action.changeDate = getCurrentDate();
            $scope.action.createDate = getCurrentDate();
            console.log($scope.action)
            ProjectCouch.save($scope.action, function (action) {
                $location.path('/actions');
            });
        }

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

    var ActionEditCtrl = function ($scope, ProjectCouch, $location , $routeParams ) {
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

    app.controller("ActionListCtrl", ['$scope', 'ProjectCouch', ActionListCtrl]);
    app.controller("ActionNewCtrl", ['$scope', 'ProjectCouch', '$location', ActionNewCtrl]);
    app.controller("ActionEditCtrl", ['$scope', 'ProjectCouch', '$location', '$routeParams', ActionEditCtrl]);

}());