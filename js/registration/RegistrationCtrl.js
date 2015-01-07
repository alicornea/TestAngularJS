(function() {
    var app = angular.module("mrgApp");

    var RegistrationCtrl = function($scope, UsersService, ProjectCouch, $location, SessionStore) {
        $scope.register = function(user) {
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
                        SessionStore.userInfo(userInfo);
                        
                        $location.path('/');
                    });
                }
                
                alert("User already exists!");
            });
        };
    };

    app.controller("RegistrationCtrl", ['$scope', 'UsersService', 'ProjectCouch', '$location', 'SessionStore', RegistrationCtrl]);
}());