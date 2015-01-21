(function() {
    var app = angular.module("mrgApp");

    var RegistrationCtrl = function($scope, AuthService, $location, $translatePartialLoader, $translate) {

        $translatePartialLoader.addPart('registration');
        $translate.refresh();
        
        $scope.hasError = false;
        $scope.alert = {
            show: false
        };

        $scope.register = function(user) {

            $scope.alert.show = false;

            AuthService.register(user).then(function(successfulRegistration) {
                if (successfulRegistration) {
                    $location.path("/");
                }

                $scope.hasError = true;
                $scope.alert.show = true;
            });
        };
    };

    app.controller("RegistrationCtrl", ['$scope', 'AuthService', '$location', '$translatePartialLoader', '$translate', RegistrationCtrl]);
}());