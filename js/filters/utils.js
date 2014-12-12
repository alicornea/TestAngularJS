var app = angular.module('tutorialWebApp');

app.filter("currentDate",["$filter", function($filter){
	return function(){
		return $filter('date')(new Date(), 'yyyy-MM-dd');
	}
}]);


app.filter("currentDateTime",["$filter", function($filter){
	return function(){
		return $filter('date')(new Date(), 'yyyy-MM-dd hh:mm');
	}
}]);