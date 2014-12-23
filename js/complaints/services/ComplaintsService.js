(function() {
    angular.module('mrgApp')
        .service('ComplaintsService', ['$location','ProjectCouch','DateTime','storageSrv','SessionStore',function($location, ProjectCouch, DateTime,storageSrv,SessionStore) {
            this.getComplaints = function() {
                var promise = ProjectCouch.get({
                    q: '_design',
                    r: 'complaint',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',
                    limit:20

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
                storageSrv.insert(complaint,online); 
                /*ProjectCouch.save(complaint, function(reason) {
                    $location.path('/Complaints');
                });*/
                $location.path('/Complaints');
            };

            this.updateComplaint = function(complaint) {
                complaint.date = DateTime.currentDateTime();
                new ProjectCouch(complaint).update(function() {
                    $location.path('/Complaints');
                });
            };
            
            this.deleteComplaint = function(complaint) {
                new ProjectCouch(complaint).destroy(function() {
                    $location.path('/Complaints');
                })
            };
        }]);
}());
