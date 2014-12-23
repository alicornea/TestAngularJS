angular.module('mrgApp').controller('GroundTimeNewCtrl', ['$scope','$location','storageSrv', 'pouchFactory', function($scope,$location,storageSrv,pouchFactory){

		var self = this;
		$scope.locations = ['Area 1', 'Area 2', 'Area 3'];
		$scope.stations = ['Frankfurt', 'Munchen', 'Dortmund', 'Berlin'];
		$scope.availableAircrafts = ['Plain1', 'Plain2', 'Plain3']
		$scope.saveGroundTime = function()
		{
			storageSrv.insert($scope.groundTime,$scope.online);		
		}
		
	}
	]);
