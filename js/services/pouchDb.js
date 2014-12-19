(function() {
        angular.module('mrgApp').factory('pouchFactory',  ['$q', function($q) {





                function newGuid() {
                    function s4() {
                        return Math.floor((1 + Math.random()) * 0x10000)
                            .toString(16)
                            .substring(1);
                    }

                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                        s4() + '-' + s4() + s4() + s4();

                };

                return {
                    putObject: function(objectToInsert) {
                        var db = new PouchDB('eLog');
                        objectToInsert._id = newGuid();
                        db.put(objectToInsert, function cb(err, result) {
                            if (!err) {
                                console.log("success inserting " + objectToInsert);
                            } else
                                console.log("error inserting " + objectToIsert + err);
                        })
                    },
                    getOjectById: function(id) {
                        var db = new PouchDB('eLog');
                        return db.get(id, function(err, doc) {
                            return doc;
                        });
                    },
                    queryObject: function(mapFunction) {
                        var db = new PouchDB('eLog');
                        var deferred = $q.defer();
                        db.query({
                            map: mapFunction
                        }, {
                            reduce: false
                        }, function(err, response) {
                            deferred.resolve(response);
                        })
                        return deferred.promise;
                    },
                    sync: function() {
                        var localDb = new PouchDB('eLog');
                        // var remoteDb = new PouchDB("http://alicornea.iriscouch.com:5984/test_angular/",{header:{'Cookie':''},live:true});
                        //localDb.sync(remoteDb).on('complete', function() {
                        //   console.log("sync successful")
                        //}).on('error', function(err) {
                        //   console.log(err);
                        //})
                        PouchDB.sync('eLog', "admin:admin@http://alicornea.iriscouch.com:5984/test_angular/", {
                            live: false,
                            header: {
                                'Accept_ul': 'true'
                            }
                        });
                    }
                };

            
        }])



}());
