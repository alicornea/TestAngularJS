(function() {

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



angular.module("mrgApp").factory('storageSrv', ['pouchFactory', 'ProjectCouch', function( pouchFactory, ProjectCouch) {


    return {

        insert: function(objectToInsert, online) {
            if (online) {
                ProjectCouch.save(objectToInsert);
            } else {
                pouchFactory.putObject(objectToInsert);
            }
        },
        update: function(objectToUpdate, online) {

        },
        remove: function(objectToRemove, online) {

        },
        select: function(query, online) {

        }


    };
}])


})();

