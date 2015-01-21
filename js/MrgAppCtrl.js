(function() {
	angular.module("mrgApp").controller('MrgAppCtrl', ['$scope', 'AuthService', 'USER_ROLES', 'LOCALIZATION', '$translate', 'LocalStore',
		function($scope, AuthService, USER_ROLES, LOCALIZATION, $translate, LocalStore) {

			$scope.userRoles = USER_ROLES;
			$scope.isAuthorized = AuthService.isAuthorized;
			$scope.isAuthenticated = AuthService.isAuthenticated;
			$scope.allowedLanguages = LOCALIZATION.availableLanguages;
			$scope.currentLanguage = LocalStore.currentLanguage() != null ? LocalStore.currentLanguage() : LOCALIZATION.preferredLanguage;
			$translate.use($scope.currentLanguage);

			$scope.changeLanguage = function(language) {
				$translate.use(language);
				LocalStore.currentLanguage(language);
				console.log("language chanded to " + language);
			};
		}
	]);
}());
