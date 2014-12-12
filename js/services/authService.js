(function() {

    var AuthService = function(ProjectCouch, $window) {

        var login = function(credentials) {
            var promise = ProjectCouch.get({
                q: '_design',
                r: 'users',
                s: '_view',
                t: 'getAll',
                include_docs: 'true',
                limit: 10,
                key: '"' + credentials.username + '"'
            });

            return promise.$promise
                .then(function(result) {
                    var userInfo = {};
                    if (result.rows.length > 0) {
                        angular.forEach(result.rows, function(user) {
                            if (user.value.password == credentials.password) {
                                var userInfo = {
                                    accessToken: user.id,
                                    username: credentials.username,
                                    role: user.value.role
                                };
                                $window.sessionStorage.userInfo = JSON.stringify(userInfo);
                            }
                        });
                    }

                    return userInfo;
                });
        };

        var isAuthenticated = function() {
            return $window.sessionStorage.getItem("userInfo") !== null && !!JSON.parse($window.sessionStorage.getItem("userInfo")).accessToken;
        };

        var isAuthorized = function(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                autorizedRoles = [autorizedRoles];
            }

            return isAuthenticated() && getUserRole() !== null && authorizedRoles.indexOf(getUserRole()) > -1;
        };

        var getUserRole = function() {
            return $window.sessionStorage.getItem("userInfo") !== null ? JSON.parse($window.sessionStorage.getItem("userInfo")).role : null;
        };

        var logout = function() {
            $window.sessionStorage.removeItem("userInfo");
        };

        return {
            login: login,
            isAuthenticated: isAuthenticated,
            logout: logout,
	    isAuthorized: isAuthorized 
        };
    };

    var app = angular.module("tutorialWebApp");
    app.factory("AuthService", ['ProjectCouch', '$window', AuthService]);

}());