(function() {

    var SessionStore = function($window, SESSION_STORE_KEYS) {

        var sessionStorage = $window.sessionStorage;

        var userInfo = function(value) {
            if (!angular.isDefined(value)) {
                return get(SESSION_STORE_KEYS.userInfo);
            }

            set(SESSION_STORE_KEYS.userInfo, value);
        };

        var get = function(key) {
            return JSON.parse(sessionStorage.getItem(key) || null);
        };

        var set = function(key, value) {
            if (key !== null || value !== null) {
                sessionStorage.setItem(key, JSON.stringify(value));
            }
        }

        return {
            userInfo: userInfo,

            clear: function() {
                sessionStorage.clear();
            },
        };
    };

    var app = angular.module("mrgApp");
    app.factory("SessionStore", ['$window', 'SESSION_STORE_KEYS', SessionStore]);
}());
