angular.module('mrgApp').controller('GroundTimeNewCtrl', ['$scope', 'ProjectCouch','$location', function($scope,ProjectCouch,$location){

		var self = this;
		$scope.locations = ['Area 1', 'Area 2', 'Area 3'];
		$scope.stations = ['Frankfurt', 'Munchen', 'Dortmund', 'Berlin'];
		$scope.availableAircrafts = ['Plain1', 'Plain2', 'Plain3']
		$scope.saveGroundTime = function()
		{
			//var groundTime = new ProjectCouch($scope.groundTime);
			//groundTime.
			ProjectCouch.save($scope.groundTime, function(groundAction) {
      			$location.path('/groundtime/new');
    		});
			
		}
	}
	]);
