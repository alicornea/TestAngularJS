(function() {
    angular.module("mrgApp").controller('MrgAppCtrl', ['$scope', 'AuthService', 'USER_ROLES', 'LOCALIZATION', '$translate', function($scope, AuthService, USER_ROLES, LOCALIZATION, $translate) {

	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;
	$scope.isAuthenticated = AuthService.isAuthenticated;
	$scope.allowedLanguages = LOCALIZATION.availableLanguages;
	$scope.currentLanguage = LOCALIZATION.preferredLanguage;
	
	$scope.changeLanguage = function(currentLanguage){
	  $translate.use(currentLanguage);
	  console.log("language chanded to " + currentLanguage);
	};
    }]);
}());
