(function() {
    angular.module('mrgApp')
        .service('ComplaintsService', ['$location', 'ProjectCouch', 'DateTime', 'storageSrv', 'SessionStore', function($location, ProjectCouch, DateTime, storageSrv, SessionStore) {


            this.getComplaints = function(startKey, numberOfResults, groundTime, online) {
                if (online)
                    startKey = '"' + startKey + '"';

                var options = [
                    ["startkey", startKey === undefined ? '""' : startKey],
                    ["limit", numberOfResults > 0 ? numberOfResults + 1 : 10],
                    ["key", '"' + groundTime + '"']
                ];
                return storageSrv.select('_design/complaint/_view/byGroundTime', online, options, true);
            };

            this.getComplaintsByIndex = function(index, numberOfResults, groundTime, online) {

                var options = [
                    ["skip", index],
<<<<<<< HEAD
                    ["limit", numberOfResults > 0 ? numberOfResults : 10]
=======
                    ["limit", numberOfResults > 0 ? numberOfResults + 1 : 10],
                    ["key", '"' + groundTime + '"']
>>>>>>> 0884cc74d67780570e8145c55446b760808c48ff
                ];

                return storageSrv.select('_design/complaint/_view/byGroundTime', online, options, true);

            };

            this.getComplaint = function(complaintId, online) {

                return storageSrv.select('_design/complaint/_view/getAll', online, 20, true, complaintId);

            };

            this.getComplaintAndItsActions = function(complaintId) {

                var promise = getComplaintAndActions(complaintId);

                return promise;

            };



            function getComplaintAndActions(complaintId, online) {

                var options = [
                    ["startkey", "[\"" + complaintId + "\"]"],
                    ["endkey", "[\"" + complaintId + "\",{}]"]
                ];

                return storageSrv.select('_design/complaint/_view/complaintandactions', online, options)

            };

            this.saveComplaint = function(complaint, online) {
                complaint.date = DateTime.currentDateTime();
                complaint.groundTimeId = SessionStore.selectedGroundTime();

                storageSrv.insert(complaint, online).then(function() {
                    $location.path('/Complaints');
                })
            };

            this.updateComplaint = function(complaint, online) {
                complaint.date = DateTime.currentDateTime();
                storageSrv.update(complaint, online).then(function() {
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

            this.deleteComplaint = function(complaint, online) {

                var promise = getComplaintAndActions(complaint._id, online);
                promise.then(ProcessData, ProcessError);

            };
        }])
}());
