(function() {
    angular.module("constants", [])
        .constant('USER_ROLES', {
            admin: 'admin',
            guest: 'guest',
        });
}());