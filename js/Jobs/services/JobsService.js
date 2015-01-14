(function() {
    angular.module('mrgApp')
        .service('JobsService', ['ProjectCouch', 'storageSrv', function(ProjectCouch, storageSrv) {
            
            this.getJobsByIndex = function(index, numberOfResults, groundTime, online) {

                var options = [
                    ["skip", index],
                    ["limit", numberOfResults > 0 ? numberOfResults : 10]
                    // ["key", '"' + groundTime + '"']
                ];
                
                return ProjectCouch.get({
                    q: '_design',
                    r: 'jobs',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',
                    skip : index,
                    limit: numberOfResults > 0 ? numberOfResults : 10
                })

                //return storageSrv.select('_design/complaint/_view/byGroundTime', online, options, true);
            };
        }])
}());