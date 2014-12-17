(function() {
    angular.module("mrgApp").controller('MrgAppCtrl', ['$scope', 'AuthService', 'USER_ROLES', function($scope, AuthService, USER_ROLES) {

	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;
    }]);
}());
