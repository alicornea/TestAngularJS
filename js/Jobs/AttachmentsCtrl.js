(function() {
    var app = angular.module("mrgApp");
    alert("ce faci mha");
    
    var AttachmentsCtrl = function ($scope, $location, ProjectCouch) {
        console.log("Attachements reporting for duty.");
    };

    app.controller("AttachmentsCtrl", ['$scope', '$location', 'ProjectCouch', AttachmentsCtrl]);    
}());