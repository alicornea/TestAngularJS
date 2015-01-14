(function() {
    var app = angular.module("mrgApp");

    var RegistrationCtrl = function($scope, UsersService, ProjectCouch, $location, LocalStore, SessionStore, jwt) {

        $scope.hasError = false;
        $scope.alert = {
            show: false
        };

        $scope.register = function(user) {

            $scope.alert.show = false;

            var promise = UsersService.getUsers(user.username);

            promise.$promise.then(function(result) {
                if (result.rows.length === 0) {
                    var userToRegister = {
                        role: "guest",
                        item: "users",
                        password: CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex),
                        username: user.username,
                    };

                    ProjectCouch.save(userToRegister, function(result) {
                        var userInfo = {
                            token: jwt.encode({
                                username: userToRegister.username,
                                id: result.id
                            }, "shhh..."),
                            username: userToRegister.username,
                            role: userToRegister.role
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

    app.controller("RegistrationCtrl", ['$scope', 'UsersService', 'ProjectCouch', '$location', 'LocalStore', 'SessionStore', 'jwt', RegistrationCtrl]);
}());