(function() {

    var AuthService = function(ProjectCouch, SessionStore) {

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
                                SessionStore.userInfo(userInfo);
                            }
                        });
                    }

                    return userInfo;
                });
        };

        var isAuthenticated = function() {
            return SessionStore.userInfo() !== null && !!SessionStore.userInfo().accessToken;
        };

        var isAuthorized = function(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                autorizedRoles = [autorizedRoles];
            }

            return isAuthenticated() && getUserRole() !== null && authorizedRoles.indexOf(getUserRole()) > -1;
        };

        var getUserRole = function() {
            return SessionStore.userInfo() !== null ? SessionStore.userInfo().role : null;
        };

        var logout = function() {
            SessionStore.clear();
        };

        return {
            login: login,
            isAuthenticated: isAuthenticated,
            logout: logout,
	    isAuthorized: isAuthorized 
        };
    };

    var app = angular.module("mrgApp");
    app.factory("AuthService", ['ProjectCouch', 'SessionStore', AuthService]);

}());