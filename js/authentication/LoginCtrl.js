(function() {
    var app = angular.module("mrgApp");
    
    var LoginController = function($scope, LocalStore, AuthService) {

        $scope.login = function(credentials) {
            AuthService.login(credentials);
        };

        $scope.isAuthenticated = function() {
            if (AuthService.isAuthenticated()) {
                $scope.username = LocalStore.userInfo().username;
                return true;
            }

            return false;
        };

        $scope.logout = function() {
            AuthService.logout();
        };
    };

    app.controller("LoginController", ['$scope', 'LocalStore', 'AuthService', LoginController]);

}());