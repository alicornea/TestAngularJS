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
                    return ProjectCouch.save(objectToInsert);
                } else {
                    return pouchFactory.putObject(objectToInsert);
                }
            },
            update: function(objectToUpdate, online) {
                if (online) {
                    var promise = new ProjectCouch(objectToUpdate).update();
                    return promise.$promise;
                } else
                    return pouchFactory.updateObject(objectToUpdate);
            },
            destroy: function(objectToRemove, online) {
                if (online) {
                    new ProjectCouch(objectToRemove).destroy();
                } else {
                    pouchFactory.destroyObject(objectToRemove);
                }
            },
            alldocs: function() {
                var r = pouchFactory.alldocs();
                return r;
            },
            select: function(viewPath, online, options, allDocs, key) {
                if (typeof allDocs === 'undefined') allDocs = false;


                if (online) {
                    var viewPathArray = viewPath.split('/');
                    var requestObjects = {
                        include_docs: allDocs ? 'true' : 'false',
                    };
                    /*if (typeof limit !== 'undefined')
                        requestObjects.limit = limit;
                    */
                    for(i=0;i<options.length;i++)
                    {
                        requestObjects[options[i][0]]=options[i][1];
                    }
                    if (key)
                        requestObjects.key = '"' + key + '"';

                    if (viewPathArray.length > 0)
                        requestObjects.q = viewPathArray[0];
                    if (viewPathArray.length > 1)
                        requestObjects.r = viewPathArray[1];
                    if (viewPathArray.length > 2)
                        requestObjects.s = viewPathArray[2];
                    if (viewPathArray.length > 3)
                        requestObjects.t = viewPathArray[3];
                    var promise = ProjectCouch.get(requestObjects);

                    return promise.$promise;
                } else {
                    viewPath = viewPath.replace("_design/", "");
                    viewPath = viewPath.replace("_view/", "");
                    var response = pouchFactory.queryObject(viewPath, limit, key);
                    return response;
                }
            }


        };
    }])


})();
