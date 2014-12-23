(function() {
    angular.module("mrgApp").controller('DashboardCtrl', ['$scope','pouchFactory','SessionStore', function($scope,pouchFactory,SessionStore) {

        console.log("dashboard ready");

        $scope.$on('groundTimeChange', function(ev, rec) {

        	pouchFactory.sync();
            SessionStore.selectedGroundTime( rec.id)
            $scope.selectedGroundtime = rec;
        });


        $scope.switchTabs = function(currentTab) {
            alert(currentTab)
        }

    }]);
}());
