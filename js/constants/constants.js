(function() {
    angular.module("constants", [])
        .constant('USER_ROLES', {
            admin: 'admin',
            guest: 'guest',
        })
	.constant("SESSION_STORE_KEYS", {
	    userInfo: 'userInfo',
	});
}());