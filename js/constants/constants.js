(function() {
    angular.module("constants", [])
        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin',
            guest: 'guest',
        });
}());