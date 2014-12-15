(function() {
    angular.module("mrgApp").directive("accGroundTimeBox", ["ProjectCouch", "$location", function(ProjectCouch, $location) {
        return {
            scope: {

            },
            restrict: 'E',
            link: function(scope) {

                scope.gotoGroundTime = function(groundTime) {
                    if (groundTime.selectedGroundTime)
                        $location.path('/groundtime/edit/' + groundTime.selectedGroundTime.id);
                    else
                        $location.path('/groundtime/new');
                }

                ProjectCouch.get({
                    q: '_design',
                    r: 'groundTime',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',

                }).$promise.then(function(data) {
                    scope.groundTimes = data.rows;
                });
            },

            templateUrl: 'partials/groundTime/directives/CreateEditBoxGroundTime.html'
        }
    }]);
}());
