(function() {
    angular.module('mrgApp')
        .service('JobsService', ['storageSrv', '$location', 'DateTime', '$rootScope', 'SessionStore', function(storageSrv, $location, DateTime, $rootScope, SessionStore) {

            this.getJob = function(jobId) {
                return storageSrv.select('_design/jobs/_view/getAll', $rootScope.online, 20, true, jobId);
            };

            this.getJobsByIndex = function(index, numberOfResults) {

                var options = [
                    ["skip", index],
                    ["limit", numberOfResults > 0 ? numberOfResults : 10],
                    ["key", '"' + SessionStore.selectedGroundTime() + '"']
                ];

                return storageSrv.select('_design/jobs/_view/getJobsByGroundTime', $rootScope.online, options, true);
            };

            this.saveJob = function(job) {
                job.date = DateTime.currentDateTime();
                job.groundTimeId = SessionStore.selectedGroundTime();

                storageSrv.insert(job, $rootScope.online).then(function() {
                    $location.path('/jobs');
                })
            };

            this.updateJob = function(job) {
                job.date = DateTime.currentDateTime();

                storageSrv.update(job, $rootScope.online).then(function() {
                    $location.path('/jobs');
                })
            };

            this.deleteJob = function(job) {
                storageSrv.destroy(job, $rootScope.online).then(function() {
                    $location.path('/jobs');
                });
            };
        }])
}());