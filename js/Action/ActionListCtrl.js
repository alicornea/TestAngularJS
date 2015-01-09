(function () {

    var app = angular.module("mrgApp");

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
         
        }, function (reason) {
            console.log(JSON.stringify(reason));
        });

    };


    app.controller("ActionListCtrl", ['$scope', 'ProjectCouch', ActionListCtrl]);

}());