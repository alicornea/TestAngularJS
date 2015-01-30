(function () {
    var app = angular.module('mrgApp');

    app.filter("currentDate", ["$filter", function ($filter) {
        return function () {
            return $filter('date')(new Date(), 'yyyy-MM-dd');
        }
    }]);


    app.filter("currentDateTime", ["$filter", function ($filter) {
        return function () {
            return $filter('date')(new Date(), 'yyyy-MM-dd hh:mm');
        }
    }]);
    
    app.filter("sortingType", function(){
        return function(descending){
            return descending !== undefined && descending ? '\u25BC' : '\u25B2';
        };
    });
    
    app.filter("contains", function() {
        return function(strings){
          return strings[1] === undefined || strings[1].length === 0 || strings[0].indexOf(strings[1]) >= 0;  
        };
    });

}());