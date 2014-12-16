

angular.module('mrgApp').
    factory('ProjectCouch', ['$resource', function ($resource) {

        

        console.log("service couch ready");
        var ProjectCouch = $resource(':protocol//:server/:db/:q/:r/:s/:t',
                                     { protocol: 'http:', server: 'alicornea.iriscouch.com', db: 'test_angular' }, {
                                         update: { method: 'PUT' }
                                     }
       );

        ProjectCouch.prototype.update = function (cb) {
            return ProjectCouch.update({ q: this._id },
                this, cb);
        };

        ProjectCouch.prototype.destroy = function (cb) {
            return ProjectCouch.remove({ q: this._id, rev: this._rev }, cb);
        };

        return ProjectCouch;
    }]);


