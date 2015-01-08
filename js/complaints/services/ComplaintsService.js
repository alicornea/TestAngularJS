(function() {
    angular.module('mrgApp')
        .service('ComplaintsService', ['$location', 'ProjectCouch', 'DateTime', 'storageSrv', 'SessionStore', function($location, ProjectCouch, DateTime, storageSrv, SessionStore) {


            this.getComplaints = function(startKey, numberOfResults, online) {
                /*var promise = ProjectCouch.get({
                    q: '_design',
                    r: 'complaint',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',

                    limit: numberOfResults > 0 ? numberOfResults + 1 : 10,
                    startkey: startKey === undefined ? '""' : '"' + startKey + '"'
                });*/

                var options = [
                    ["startkey", startKey === undefined ? '""' : '"' + startKey + '"'],
                    ["limit", numberOfResults > 0 ? numberOfResults + 1 : 10]
                ];

                return storageSrv.select('_design/complaint/_view/getAll', online, options, true );

                //return promise.$promise;
            };

            this.getComplaintsByIndex = function(index, numberOfResults, online) {
               /* var promise = ProjectCouch.get({
                    q: '_design',
                    r: 'complaint',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',
                    limit: numberOfResults > 0 ? numberOfResults : 10,
                    skip: index

                });

                return promise.$promise;*/
                 var options = [
                    ["skip", index],
                    ["limit", numberOfResults > 0 ? numberOfResults + 1 : 10]
                ];

                return storageSrv.select('_design/complaint/_view/getAll', online, options, true );

            };

            this.getComplaint = function(complaintId, online) {

                return storageSrv.select('_design/complaint/_view/getAll', online, 20, true, complaintId);

            };

            this.getComplaintAndItsActions = function(complaintId) {

                var promise = getComplaintAndActions(complaintId);

                return promise;

            };


 
           function getComplaintAndActions(complaintId) {

                var promise = ProjectCouch.get({

                    q: '_design',

                    r: 'complaint',

                    s: '_view',

                    t: 'complaintandactions',

                    include_docs: 'false',

                    limit: 10,

                    startkey: "[\"" + complaintId + "\"]",

                    endkey: "[\"" + complaintId + "\",{}]"

                });


                return promise.$promise;

            };



  

            this.saveComplaint = function(complaint, online) {
                complaint.date = DateTime.currentDateTime();
                complaint.groundTimeId = SessionStore.selectedGroundTime();

                storageSrv.insert(complaint, online);
                $location.path('/Complaints');

            };

            this.updateComplaint = function(complaint, online) {
                complaint.date = DateTime.currentDateTime();
                storageSrv.update(complaint, online).then(function() {
                    $location.path('/Complaints');
                });
                /*new ProjectCouch(complaint).update(function() {
                    $location.path('/Complaints');
                });*/
            };

           var ProcessData = function (data) {

                //  console.log(JSON.stringify(data));

                  ProjectCouch.bulkRemove(data.rows);

                  $location.path('/Complaints');

            };

            
           var ProcessError = function (reason) {

                alert(reason);

            };


  

            this.deleteComplaint = function(complaint, online) {
                // storageSrv.destroy(complaint, online);
                /*new ProjectCouch(complaint).destroy(function() {
                    $location.path('/Complaints');
                })*/
               // $location.path('/Complaints');

                var promise = getComplaintAndActions(complaint._id);

                promise.then(ProcessData, ProcessError);


                $location.path('/Complaints');
            };
        }])
}());

