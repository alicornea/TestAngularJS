angular.module('mrgApp').controller('TestCtrl', ['$scope', 'ProjectCouch', function

		($scope, ProjectCouch) {
$scope.$on('groundTimeChange', function (ev,rec) { alert('event is clicked'); });  
			console.log("test Controller reporting for duty2.");

			var promise = ProjectCouch.get({
					q : '_design',
					r : 'actions',
					s : '_view',
					t : 'getAll',
					include_docs : 'true',
					limit : 10
				});
			promise.$promise.then(function (data) {
				$scope.actions = data;
			}, function (reason) {
				alert(reason);
			});

		}
	])

.controller('TestEditCtrl',['$scope','ProjectCouch','$location','$routeParams',
function($scope,ProjectCouch,$location,$routeParams){
  console.log("test edit Controller reporting for duty.");
  var self = this;

  ProjectCouch.get({q: $routeParams.actionid}, function(action) {
    self.original =action;
    $scope.action = new ProjectCouch(self.original);
  });

  $scope.isClean = function() {
    return angular.equals(self.original, $scope.action);
  }

  $scope.destroy = function(actiune) {
    actiune.destroy(function() {
      $location.path('/test');
    });
  };

  $scope.save = function() {
    $scope.action.update(function() {
      $location.path('/');
    });
  };
}])
.controller('TestNewCtrl',['$scope','ProjectCouch','$location','$routeParams',
function($scope,ProjectCouch,$location,$routeParams){
  console.log("test newController reporting for duty.");
 $scope.save = function() {
    ProjectCouch.save($scope.action, function(action) {
      $location.path('/test/');
    });
  }
}]);



