angular.module("tutorialWebApp").directive("accGround",["ProjectCouch",function(ProjectCouch)
	{
		return {
		restrict: 'E',
		controller : function ($scope) {
			
			
			var promise = ProjectCouch.get({
					q : '_design',
					r : 'groundTime',
					s : '_view',
					t : 'getAll',
					include_docs : 'true',
					
				});
			promise.$promise.then(function (data) {
				$scope.groundTimes = data.rows;
			}, function (reason) {
				alert(reason);
			});

		   },
		
		
			templateUrl :'partials/groundTime/directives/ddlGroundTime.html'
		}
	}]);