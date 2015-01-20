

angular.module('mrgApp').
    factory('ProjectCouch', ['$resource', function ($resource) {
       

        console.log("service couch ready");
        var ProjectCouch = $resource(':protocol//:server/:db/:q/:r/:s/:t',
                                     { protocol: 'https:', server: 'alicornea.iriscouch.com:5984', db: 'test_angular' }, {
                                         update: { method: 'PUT' }, bulkUpdate: { method: 'POST', isArray: true}
                                     }
       );

        ProjectCouch.prototype.update = function (cb) {
            return ProjectCouch.update({ q: this._id },
                this, cb);
        };

        ProjectCouch.prototype.destroy = function (cb) {
            return ProjectCouch.remove({ q: this._id, rev: this._rev }, cb);
        };

        ProjectCouch.bulkRemove = function (docs) {

           var allDocs = [];

           for(var i = 0; i< docs.length; i++)

                 {
   
                  allDocs[i] = docs[i].value;

                     allDocs[i]._deleted = true;

                 }


     //      console.log("docs cu prop de delete = " + JSON.stringify(allDocs));


           docs = "{ \"docs\" :" + JSON.stringify(allDocs) + "}";

           var docsToBeRemoved = JSON.parse(docs);



           var promise = ProjectCouch.bulkUpdate({q:"_bulk_docs"}, docsToBeRemoved);
 
        }; 
        
        
      

        return ProjectCouch;
    }]);


