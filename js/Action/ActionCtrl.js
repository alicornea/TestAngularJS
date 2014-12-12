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
            console.log($scope.action)
            ProjectCouch.save($scope.action, function (action) {
                $location.path('/actions/');
            });
        }
    };

    var ActionEditCtrl = function ($scope, ProjectCouch) {
        console.log("edit action")
    };

    app.controller("ActionListCtrl", ['$scope', 'ProjectCouch', ActionListCtrl]);
    app.controller("ActionNewCtrl", ['$scope', 'ProjectCouch', '$location', ActionNewCtrl]);
    app.controller("ActionEditCtrl", ['$scope', 'ProjectCouch', '$location', ActionEditCtrl]);

}());