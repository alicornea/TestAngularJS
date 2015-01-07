(function() {
    angular.module("mrgApp").directive('validateEquals', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                function validateEquals(value) {
                    var valid = (value === scope.$eval(attrs.validateEquals));
                    ngModelCtrl.$setValidity('equal', valid);
                    if(!valid)
                        return undefined;
                }
                
                ngModelCtrl.$parsers.push(validateEquals);
                //ngModelCtrl.$formatters.push(validateEquals);

                scope.$watch(attrs.validateEquals, function(value) {
                    ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
                });
            }
        };
    });
}());