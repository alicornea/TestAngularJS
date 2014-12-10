(function(){
  var app = angular.module("authentication");
  
  var LoginController = function($scope, AuthService){
    
    $scope.login = function(credentials){
      AuthService.login(credentials).then(function(){
        $scope.setCurrentUser(user);
      }, function(){
		//Login failed
      });
    };
  };
  
  app.controller("LoginController", ['$scope', 'AuthService', LoginController]);
  
}());