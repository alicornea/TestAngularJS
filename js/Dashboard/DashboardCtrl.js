(function() {
    angular.module("mrgApp").controller('DashboardCtrl', ['$scope', function($scope) {

        console.log("dashboard ready");

        $scope.$on('groundTimeChange', function(ev, rec) {
            $scope.selectedGroundtime = rec;
        });


        $scope.switchTabs = function(currentTab) {
            alert(currentTab)
        }

    }]);
}());
