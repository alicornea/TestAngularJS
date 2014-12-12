angular.module("tutorialWebApp").directive("GroundTimeBoxCtrl",["$scope","ProjectCouch",function($scope, ProjectCouch){

ProjectCouch.get({
					q : '_design',
					r : 'groundTime',
					s : '_view',
					t : 'getAll',
					include_docs : 'true',
					
				}).then(function(data){$scope.groundTimes = data.rows;});

}

	]);