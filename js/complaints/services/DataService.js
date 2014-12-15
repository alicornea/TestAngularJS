(function() {
    angular.module('mrgApp')
        .service('DataService', function(ProjectCouch) {
            this.getComplaintTypes = function() {
                var types = [];
                for (var i = 1; i < 5; i++)
                    types.push({
                        'Name': 'Type' + i
                    });

                return types;
            };

            this.getWorkgroups = function() {
                var workgroups = [];
                for (var i = 1; i < 5; i++)
                    workgroups.push({
                        'Name': 'Workgroup' + i
                    });

                return workgroups;
            };
        })
}());
