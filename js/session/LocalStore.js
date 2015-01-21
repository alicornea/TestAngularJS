(function() {

    var LocalStore = function($window, LOCAL_STORE_KEYS) {

        var localStorage = $window.localStorage;

        var userInfo = function(value) {
            if (!angular.isDefined(value)) {
                return get(LOCAL_STORE_KEYS.userInfo);
            }

            set(LOCAL_STORE_KEYS.userInfo, value);
        };

        var currentLanguage = function(value) {
            if (!angular.isDefined(value)) {
                return get(LOCAL_STORE_KEYS.currentLanguage);
            }

            set(LOCAL_STORE_KEYS.currentLanguage, value);
        };

        var get = function(key) {
            return JSON.parse(localStorage.getItem(key) || null);
        };

        var set = function(key, value) {
            if (key !== null || value !== null) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        };

        return {
            userInfo: userInfo,
            currentLanguage: currentLanguage,
            clear: function() {
                localStorage.clear();
            },
        };
    };

    var app = angular.module("mrgApp");
    app.factory("LocalStore", ['$window', 'LOCAL_STORE_KEYS', LocalStore]);
}());
