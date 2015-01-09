(function() {
    angular.module('mrgApp').factory('pouchFactory', ['$q', 'SessionStore', function($q, SessionStore) {
        return {
            putObject: function(objectToInsert) {
                var db = new PouchDB('eLog');
                var deferred = $q.defer();
                db.post(objectToInsert, function cb(err, result) {
                    if (!err) {
                        console.log("success inserting " + objectToInsert);
                    } else
                        console.log("error inserting " + objectToIsert + err);
                    deferred.resolve(result);
                })
                return deferred.promise;
            },
            updateObject: function(objectToUpdate) {
                var db = new PouchDB('eLog');
                var deferred = $q.defer();
                db.put(objectToUpdate, function cb(err, result) {
                    if (!err) {
                        console.log("success updating " + objectToUpdate);

                    } else
                        console.log("error updating " + objectToUpdate + err);
                    deferred.resolve(result)
                })
                return deferred.promise;
            },
            destroyObject: function(objectToDestroy) {
                var db = new PouchDB('eLog');
                var deferred = $q.defer();
                db.remove(objectToDestroy, function cb(err, result) {
                    if (!err) {
                        console.log("success deleting " + objectToDestroy);
                    } else
                        console.log("error deleting " + objectToDestroy + err);
                    deferred.resolve(result);
                });

                return deferred.promise;
            },
            getOjectById: function(id) {
                var db = new PouchDB('eLog');
                return db.get(id, function(err, doc) {
                    return doc;
                });
            },
            queryObject: function(mapFunction, options, key) {
                var db = new PouchDB('eLog');
                var deferred = $q.defer();
                var queryOptions = {
                    reduce: false,
                }
                if (options) {
                    for (i = 0; i < options.length; i++) {
                        queryOptions[options[i][0]] = options[i][1];
                    }
                }
                if (key)
                    queryOptions.key = key;

                db.query(
                    mapFunction,
                    queryOptions,
                    function(err, response) {
                        if(err) console.log(err);
                        deferred.resolve(response);
                    })
                return deferred.promise;
            },
            sync: function() {
                var localDb = new PouchDB('eLog');

                function filterByGroundTime(doc) {


                    //  if (doc.item && (doc.groundTimeId == SessionStore.selectedGroundTime() || doc.item == "groundTime")) {
                    return true;
                    //}
                }
                console.log("sync started");
                PouchDB.sync('eLog', "admin:admin@http://alicornea.iriscouch.com:5984/test_angular/", {
                    live: false,
                    filter: filterByGroundTime,
                    header: {
                        'filter': '_design/replicateGroundTime'
                    }
                });
            }
        };


    }])



}());
