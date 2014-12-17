(function() {
    var app = angular.module("mrgApp");

    var LoginController = function($scope, $window, AuthService) {

        $scope.login = function(credentials) {
            AuthService.login(credentials);
        };

        $scope.isAuthenticated = function() {
            if (AuthService.isAuthenticated()) {
                $scope.username = JSON.parse($window.sessionStorage.getItem("userInfo")).username;
                return true;
            }

            return false;
        };

        $scope.logout = function() {
            AuthService.logout();
        };
    };

    app.controller("LoginController", ['$scope', '$window', 'AuthService', LoginController]);

}());