angular.module("tutorialWebApp").controller('GroundTimeEditCtrl', ['$scope', 'ProjectCouch', '$routeParams', function ($scope, ProjectCouch, $routeParams) {
	console.log("edit ground");
	var self = this;
	$scope.locations = ['Area 1', 'Area 2', 'Area 3'];
	$scope.stations = ['Frankfurt', 'Munchen', 'Dortmund', 'Berlin'];
	$scope.availableAircrafts = ['Plain1', 'Plain2', 'Plain3']
	ProjectCouch.get({
					q : '_design',
					r : 'groundTime',
					s : '_view',
					t : 'getAll',
					key : '"' + $routeParams.id + '"',
					include_docs : 'true',
					
	}).$promise.then(function(data){
		$scope.groundTime = data.rows[0].doc;
	});

}]);