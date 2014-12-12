(function() {
    angular.module("tutorialWebApp").
    run(function($location, $rootScope, $route, USER_ROLES, AuthService) {
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var nextPath = $location.path();
            var nextRoute = $route.routes[nextPath];
            if (nextRoute.authorizedRoles != undefined) {
                var authorizedRoles = nextRoute.authorizedRoles;
                if (!AuthService.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                }
            }
        });
    });
}());