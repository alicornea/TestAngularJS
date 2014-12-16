(function() {
    angular.module("mrgApp").controller('DashboardCtrl', ['$scope', function($scope) {

        console.log("dashboard ready");

        $scope.switchTabs = function(currentTab)
        {
        	alert(currentTab)
        }

        $scope.$on('groundTimeChange',
            function(event, groundTime) {
                alert('event is clicked' + groundTime.doc._id)
            });
    }]);
}());
