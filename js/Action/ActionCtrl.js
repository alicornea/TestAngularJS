(function () {

    var app = angular.module("tutorialWebApp");

    var ActionListCtrl = function ($scope, ProjectCouch) {
        console.log("list actions");
        var action1 = { "compliantNo": "1", "title": "my title", "description": "this is the description.", "status": "green", "createDate": "10/10/1021", "changeDate": "10/10/1021", "issueByUser": "aura" };
        var action2 = { "compliantNo": "2", "title": "my dsdae", "description": "this is thdsadasrdation.", "status": "green", "createDate": "10/12/1021", "changeDate": "10/10/1021", "issueByUser": "aura" };
        var list = [];
        list.push(action1);
        list.push(action2);
        $scope.actions = list;

    };

    var ActionNewCtrl = function ($scope, ProjectCouch) {
        console.log("new action")
    };

    var ActionEditCtrl = function ($scope, ProjectCouch) {
        console.log("edit action")
    };

    app.controller("ActionListCtrl", ['$scope', 'ProjectCouch', ActionListCtrl]);
    app.controller("ActionNewCtrl", ['$scope', 'ProjectCouch', ActionNewCtrl]);
    app.controller("ActionEditCtrl", ['$scope', 'ProjectCouch', ActionEditCtrl]);

}());