(function(){
  var app = angular.module("tutorialWebApp");
  
  var LoginController = function($scope, AuthService){
    
    $scope.login = function(credentials){
      AuthService.login(credentials).then(function(){
        //$scope.setCurrentUser(user);
	console.log("login success");
      }, function(){
		//Login failed
      });
    };
  };
  
  app.controller("LoginController", ['$scope', 'AuthService', LoginController]);
  
}());