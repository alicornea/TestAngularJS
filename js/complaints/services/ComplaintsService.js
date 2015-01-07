(function() {
    angular.module('mrgApp')
        .service('ComplaintsService', ['$location', 'ProjectCouch', 'DateTime', 'storageSrv', 'SessionStore', function($location, ProjectCouch, DateTime, storageSrv, SessionStore) {
            this.getComplaints = function(startKey, numberOfResults) {
                var promise = ProjectCouch.get({
                    q: '_design',
                    r: 'complaint',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',
                    limit: numberOfResults > 0 ? numberOfResults + 1 : 10,
                    startkey: startKey === undefined ? '""' : '"' + startKey + '"'
                });

                return promise.$promise;
            };
            
            this.getComplaintsByIndex = function(index, numberOfResults) {
                var promise = ProjectCouch.get({
                    q: '_design',
                    r: 'complaint',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',
                    limit: numberOfResults > 0 ? numberOfResults : 10,
                    skip: index
                });

                return promise.$promise;
            };

            this.getComplaint = function(complaintId) {
                var promise = ProjectCouch.get({
                    q: '_design',
                    r: 'complaint',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',
                    limit: 1,
                    key: "\"" + complaintId + "\""
                });

                return promise.$promise;
            };

            this.saveComplaint = function(complaint, online) {
                complaint.date = DateTime.currentDateTime();
                complaint.groundTimeId = SessionStore.selectedGroundTime();
                storageSrv.insert(complaint, online);
                $location.path('/Complaints');
            };

            this.updateComplaint = function(complaint) {
                complaint.date = DateTime.currentDateTime();
                new ProjectCouch(complaint).update(function() {
                    $location.path('/Complaints');
                });
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