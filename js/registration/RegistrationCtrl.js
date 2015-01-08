(function() {
    var app = angular.module("mrgApp");

    var RegistrationCtrl = function($scope, $rootScope, UsersService, ProjectCouch, $location, LocalStore, SessionStore) {

        $scope.hasError = false;
        $scope.alert = {
            show: false
        };

        $scope.register = function(user) {

            $scope.alert.show = false;

            var promise = UsersService.getUsers(user.username);

            promise.$promise.then(function(result) {
                if (result.rows.length === 0) {
                    user.role = "guest";
                    user.item = "users";
                    ProjectCouch.save(user, function(result) {
                        var userInfo = {
                            accessToken: result.id,
                            username: user.username,
                            role: user.role
                        };
                        LocalStore.userInfo(userInfo);

                        SessionStore.successfulRegistration(true);

                        $location.path('/');
                    });
                }
                else {
                    $scope.hasError = true;
                    $scope.alert.show = true;
                }
            });
        };
    };

    app.controller("RegistrationCtrl", ['$scope', '$rootScope', 'UsersService', 'ProjectCouch', '$location', 'LocalStore', 'SessionStore', RegistrationCtrl]);
}());