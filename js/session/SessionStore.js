(function() {

    var SessionStore = function($window) {

        var sessionStorage = $window.sessionStorage;




        return {
            get: function(item) {
                return JSON.parse(sessionStorage.getItem(item) || null);
            },

            set: function(item, value) {
                if (item !== null || value !== null) {
                    sessionStorage.setItem(item, JSON.stringify(value));
                }
            },

            clear: function() {
                sessionStorage.clear();
            },

            remove: function(item) {
                if (item !== null) {
                    sessionStorage.removeItem(item);
                }
            }
        };
    };

    var app = angular.module("mrgApp");
    app.factory("SessionStore", ['$window', SessionStore]);
}());
