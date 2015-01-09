(function() {
  angular.module("mrgApp").directive('loginFailed', function($rootScope, AUTH_EVENTS) {
    return {
      restrict: 'A',
      templateUrl: 'partials/login/loginFailed.html',
      link: function($scope) {
        var showLoginErrorDialog = function() {
          $scope.visible = true;
        };
        $scope.close = function() {
          $scope.visible = false;
        };

        $scope.visible = false;
        $rootScope.$on(AUTH_EVENTS.loginFailed, showLoginErrorDialog);
      }
    };
  });
}());