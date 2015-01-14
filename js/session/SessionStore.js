(function() {

    var SessionStore = function($window, SESSION_STORE_KEYS) {

        var sessionStorage = $window.sessionStorage;

        var userInfo = function(value) {
            if (!angular.isDefined(value)) {
                return get(SESSION_STORE_KEYS.userInfo);
            }

            set(SESSION_STORE_KEYS.userInfo, value);
        };

        var selectedGroundTime = function(value) {
            if (!angular.isDefined(value)) {
                return get("CurrentGroundTime");
            }

            set("CurrentGroundTime", value);
        };
        
        var successfulRegistration = function(value){
            if(!angular.isDefined(value)){
                return get(SESSION_STORE_KEYS.successfulRegistration);
            }
            
            set(SESSION_STORE_KEYS.successfulRegistration, value);
        };

        var get = function(key) {
            return JSON.parse(sessionStorage.getItem(key) || null);
        };

        var set = function(key, value) {
            if (key !== null || value !== null) {
                sessionStorage.setItem(key, JSON.stringify(value));
            }
        };

        return {
            userInfo: userInfo,
            selectedGroundTime : selectedGroundTime,
            successfulRegistration: successfulRegistration,
            clear: function() {
                sessionStorage.clear();
            },


        };
    };

    var app = angular.module("mrgApp");
    app.factory("SessionStore", ['$window', 'SESSION_STORE_KEYS', SessionStore]);
}());
