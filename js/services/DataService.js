(function() {
    angular.module('mrgApp')
        .service('DataService', ['storageSrv', '$rootScope', function(storageSrv, $rootScope) {
            this.getComplaintTypes = function() {
                var options = [
                    ["limit", 20]
                ];

                return storageSrv.select('_design/complaintType/_view/getAll', $rootScope.online, options, true);
            };

            this.getWorkgroups = function() {
                var options = [
                    ["limit", 20]
                ];

                return storageSrv.select('_design/workgroup/_view/getAll', $rootScope.online, options, true);
            };

            this.getActionStatuses = function() {
                var options = [
                    ["limit", 10]
                ];

                return storageSrv.select('_design/statusAction/_view/getAll', $rootScope.online, options, true);
            }
        }]);
}());
