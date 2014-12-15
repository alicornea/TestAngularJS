(function() {
    angular.module("mrgApp").
    run(function($location, $rootScope, $route, USER_ROLES, AuthService) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            if (next.$$route.authorizedRoles !== undefined && !AuthService.isAuthorized(next.$$route.authorizedRoles)) {
                if(current.$$route.originalPath !== undefined){
			$location.path(current.$$route.originalPath);
		} else {
			$location.path("/");
		}		
            }
        });
    });
}());