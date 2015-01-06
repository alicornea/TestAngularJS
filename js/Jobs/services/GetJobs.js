(function () {
    var GetJobs = function (ProjectCouch) {

        var GetDesiredJob = function (groundTime) {
            return promise = (groundTime == undefined || groundTime == '') ?
                ProjectCouch.get({
                    q: '_design',
                    r: 'jobs',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',
                    limit: 1000
                })
               : ProjectCouch.get({
                   q: '_design',
                   r: 'jobs',
                   s: '_view',
                   t: 'getJobsByGroundTime',
                   key: groundTime,
                   include_docs: 'true',
                   limit: 1000
               });
        };

        return {
            GetDesiredJob: GetDesiredJob
        };
    };

    angular.module('mrgApp')
        .factory('JobService', ['ProjectCouch', GetJobs]);

}())