(function() {

  var AuthService = function($rootScope, UsersService, LocalStore, SessionStore, AUTH_EVENTS) {

    var login = function(credentials) {
      var promise = UsersService.getUsers(credentials.username);

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
                LocalStore.userInfo(userInfo);
              }
              else {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
              }
            });
          }
          else {
            console.log("auth failed event triggered");
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          }

          return userInfo;
        });
    };

    var isAuthenticated = function() {
      return LocalStore.userInfo() !== null && !!LocalStore.userInfo().accessToken;
    };

    var isAuthorized = function(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        autorizedRoles = [autorizedRoles];
      }

      return isAuthenticated() && getUserRole() !== null && authorizedRoles.indexOf(getUserRole()) > -1;
    };

    var getUserRole = function() {
      return LocalStore.userInfo() !== null ? LocalStore.userInfo().role : null;
    };

    var logout = function() {
      SessionStore.clear();
      LocalStore.clear();
    };

    return {
      login: login,
      isAuthenticated: isAuthenticated,
      logout: logout,
      isAuthorized: isAuthorized
    };
  };

  var app = angular.module("mrgApp");
  app.factory("AuthService", ['$rootScope', 'UsersService', 'LocalStore', 'SessionStore', 'AUTH_EVENTS', AuthService]);

}());