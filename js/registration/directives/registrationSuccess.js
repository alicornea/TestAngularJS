(function() {
  angular.module("mrgApp").directive('registrationSuccess', function($rootScope, SessionStore) {
    return {
      restrict: 'E',
      templateUrl: 'partials/registration/registrationSuccess.html',
      link: function($scope) {
        if(SessionStore.successfulRegistration()){
          $scope.visible = true;
          SessionStore.successfulRegistration(false);
        }
      }
    };
  });
}());