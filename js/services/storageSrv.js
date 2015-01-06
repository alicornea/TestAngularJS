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



    angular.module("mrgApp").factory('storageSrv', ['pouchFactory', 'ProjectCouch', function(pouchFactory, ProjectCouch) {


        return {

            insert: function(objectToInsert, online) {
                if (online) {
                    ProjectCouch.save(objectToInsert);
                } else {
                    pouchFactory.putObject(objectToInsert);
                }
            },
            update: function(objectToUpdate, online) {
                if (online) {
                    new ProjectCouch(objectToUpdate).update();
                } else
                    pouchFactory.updateObject(objectToUpdate);
            },
            destroy: function(objectToRemove, online) {
                if (online) {
                    new ProjectCouch(objectToRemove).destroy();
                } else {
                    pouchFactory.destroyObject(objectToRemove);
                }
            },
            select: function(query, viewPath, online) {
                if (online) {
                    var viewPathArray = viewPath.split('/');
                  /*  var queryParamsArray = {
                        'q', 'r', 's', 't'
                    }
                    var promise = ProjectCouch.get({
                        q: viewPathArray[0],
                        r: viewPathArray[1],
                        s: viewPathArray[2],
                        t: viewPathArray[3],
                        include_docs: 'true',
                        limit: 1,
                        
                    });*/

                    return promise.$promise;
                }
            }


        };
    }])


})();
