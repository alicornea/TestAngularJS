(function() {
    angular.module("mrgApp").controller('MrgAppCtrl', ['$scope', 'AuthService', 'USER_ROLES', 'localize', function($scope, AuthService, USER_ROLES, localize) {

	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;
	$scope.isAuthenticated = AuthService.isAuthenticated;
	$scope.allowedLanguages = localize.languages;
	$scope.currentLanguage = localize.defaultLanguage;
	
	$scope.changeLanguage = function(currentLanguage){
	  localize.setLanguage(currentLanguage);
	  console.log(localize.language);
	};
    }]);
}());
