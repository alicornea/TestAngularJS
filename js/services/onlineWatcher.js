(function(){
angular.module("mrgApp").run(['$rootScope', '$window', 'pouchFactory', function($rootScope, $window, pouchFactory) {

        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function() {
            $rootScope.$apply(function() {
                $rootScope.online = false;
            });
        }, false);
        $window.addEventListener("online", function() {
            $rootScope.$apply(function() {
                $rootScope.online = true;
                pouchFactory.sync();
            });


        }, false);

        return {

        };
    }]);
})();