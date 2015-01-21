(function() {
    angular.module('mrgApp')
        .service('JobsService', ['storageSrv', '$location', 'DateTime', function(storageSrv, $location, DateTime) {

            this.getJob = function(jobId, online) {
                return storageSrv.select('_design/jobs/_view/getAll', online, 20, true, jobId);
            };

            this.getJobsByIndex = function(index, numberOfResults, groundTime, online) {

                var options = [
                    ["skip", index],
                    ["limit", numberOfResults > 0 ? numberOfResults : 10]
                    // ["key", '"' + groundTime + '"']
                ];

                return storageSrv.select('_design/jobs/_view/getJobsByGroundTime', online, options, true);
            };

            this.saveJob = function(job, online) {
                job.date = DateTime.currentDateTime();

                storageSrv.insert(job, online).then(function() {
                    $location.path('/jobs');
                })
            };

            this.updateJob = function(job, online) {
                job.date = DateTime.currentDateTime();

                storageSrv.update(job, online).then(function() {
                    $location.path('/jobs');
                })
            };

            this.deleteJob = function(job, online) {
                storageSrv.destroy(job, online).then(function() {
                    $location.path('/jobs');
                });
            };
        }])
}());