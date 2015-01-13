(function() {
    angular.module("mrgApp").controller('DashboardCtrl', ['$scope','pouchFactory','SessionStore', function($scope,pouchFactory,SessionStore) {

        console.log("dashboard ready");

       


        $scope.switchTabs = function(currentTab) {
            alert(currentTab)
        }

    }]);
}());
