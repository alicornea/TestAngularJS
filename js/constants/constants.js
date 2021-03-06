(function() {
	angular.module("constants", [])
		.constant('USER_ROLES', {
			admin: 'admin',
			guest: 'guest',
		})
		.constant("SESSION_STORE_KEYS", {
			userInfo: 'userInfo',
			successfulRegistration: 'successfulRegistration',
		})
		.constant("LOCAL_STORE_KEYS", {
			userInfo: 'userInfo',
			currentLanguage: 'currentLanguage'
		})
		.constant("AUTH_EVENTS", {
			loginSuccess: 'auth-login-success',
			loginFailed: 'auth-login-failed'
		})
		.constant("LOCALIZATION", {
			availableLanguages: ['en', 'ro', 'de'],
			preferredLanguage: 'ro',
			fallbackLanguage: 'en'
		})
		.constant("COMPLAINTS_SORTING_TYPES", {
			byRefNo: 'byRefferenceNumber',
			byText: 'byText',
			byType: 'byType',
			byWorkgroup: 'byWorkgroup',
			byLastModificationDate: 'byLastModificationDate',
			byGroundTime: 'byGroundTime',
		});
}());