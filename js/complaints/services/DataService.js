(function() {
    angular.module('mrgApp')
        .service('DataService', function(ProjectCouch) {
            this.getComplaintTypes = function() {
                var promise = ProjectCouch.get({
                    q: '_design',
                    r: 'complaintType',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',
                    limit: 20
                });

                return promise.$promise;
            };

            this.getWorkgroups = function() {
                var promise = ProjectCouch.get({
                    q: '_design',
                    r: 'workgroup',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',
                    limit: 20
                });

                return promise.$promise;
            };
        })
}());
