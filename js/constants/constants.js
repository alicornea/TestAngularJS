(function() {
    angular.module("constants", [])
        .constant('USER_ROLES', {
            admin: 'admin',
            guest: 'guest',
        })
	.constant("SESSION_STORE_KEYS", {
	    userInfo: 'userInfo',
	})
	.constant("LOCAL_STORE_KEYS", {
	    userInfo: 'userInfo',
	})
	.constant("AUTH_EVENTS", {
	    loginSuccess: 'auth-login-success',
	    loginFailed: 'auth-login-failed'
	});
}());