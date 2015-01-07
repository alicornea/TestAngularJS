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

            this.deleteComplaint = function(complaint, online) {
                storageSrv.destroy(complaint, online);
                /*new ProjectCouch(complaint).destroy(function() {
                    $location.path('/Complaints');
                })*/
                $location.path('/Complaints');
            };
        }])
}());
