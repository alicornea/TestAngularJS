(function() {
    angular.module('mrgApp')
        .service('ComplaintsService', ['$location', 'ProjectCouch', 'DateTime', 'storageSrv', 'SessionStore', function($location, ProjectCouch, DateTime, storageSrv, SessionStore) {


            this.getComplaints = function(startKey, numberOfResults, online) {
                
                var requestStartKey = startKey;
                if(online)
                    requestStartKey = '"' + requestStartKey + '"';

                var options = [
                    ["startkey", startKey === undefined ? '""' : requestStartKey],
                    ["limit", numberOfResults > 0 ? numberOfResults + 1 : 10]
                ];

                return storageSrv.select('_design/complaint/_view/getAll', online, options, true );

                
            };

            this.getComplaintsByIndex = function(index, numberOfResults, online) {
               
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

                var promise = getComplaintAndActions(complaint._id);
                promise.then(ProcessData, ProcessError);


            /*    storageSrv.destroy(complaint, online);
                $location.path('/Complaints');
              */ 
            };
        }])
}());

