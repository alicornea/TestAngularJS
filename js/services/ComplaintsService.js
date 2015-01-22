(function() {
    angular.module('mrgApp')
        .service('ComplaintsService', ['$location', 'ProjectCouch', 'DateTime', 'storageSrv', 'SessionStore', '$rootScope', function($location, ProjectCouch, DateTime, storageSrv, SessionStore, $rootScope) {

            this.getComplaints = function(startKey, numberOfResults, groundTime) {
                if (online)
                    startKey = '"' + startKey + '"';

                var options = [
                    ["startkey", startKey === undefined ? '""' : startKey],
                    ["limit", numberOfResults > 0 ? numberOfResults + 1 : 10],
                    ["key", '"' + groundTime + '"']
                ];
                return storageSrv.select('_design/complaint/_view/byGroundTime', $rootScope.online, options, true);
            };

            this.getComplaintsByIndex = function(index, numberOfResults, groundTime) {

                var options = [
                    ["skip", index],
                    ["limit", numberOfResults > 0 ? numberOfResults : 10]
                    // ["key", '"' + groundTime + '"']
                ];

                return storageSrv.select('_design/complaint/_view/byGroundTime', $rootScope.online, options, true);
            };

            this.getComplaint = function(complaintId) {

                return storageSrv.select('_design/complaint/_view/getAll', $rootScope.online, 20, true, complaintId);

            };

            this.getComplaintAndItsActions = function(complaintId) {
                var promise = getComplaintAndActions(complaintId);

                return promise;
            };


            function getComplaintAndActions(complaintId) {

                var options = [
                    ["startkey", "[\"" + complaintId + "\"]"],
                    ["endkey", "[\"" + complaintId + "\",{}]"]
                ];

                return storageSrv.select('_design/complaint/_view/complaintandactions', $rootScope.online, options)
            };

            this.saveComplaint = function(complaint) {
                complaint.date = DateTime.currentDateTime();
                complaint.groundTimeId = SessionStore.selectedGroundTime();

                storageSrv.insert(complaint, $rootScope.online).then(function() {
                    $location.path('/Complaints');
                })
            };

            this.updateComplaint = function(complaint) {
                complaint.date = DateTime.currentDateTime();
                storageSrv.update(complaint, $rootScope.online).then(function() {
                    $location.path('/Complaints');
                });
            };

            var ProcessData = function(data) {

                ProjectCouch.bulkRemove(data.rows);

                $location.path('/Complaints/');

            };

            var ProcessError = function(reason) {
                console.log(reason);
            };

            this.deleteComplaint = function(complaint) {

                getComplaintAndActions(complaint._id, $rootScope.online).then(ProcessData, ProcessError);
            };
        }])
}());
