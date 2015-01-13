(function() {

  var AuthService = function($rootScope, UsersService, LocalStore, SessionStore, AUTH_EVENTS, jwt) {

    var login = function(credentials) {

      var promise = UsersService.getUsers(credentials.username);

      return promise.$promise
        .then(function(result) {
          var userInfo = {};
          if (result.rows.length > 0) {
            angular.forEach(result.rows, function(user) {
              var userPassword = CryptoJS.SHA256(credentials.password).toString(CryptoJS.enc.Hex);
              if (user.value.password == userPassword) {

                var payload = {
                  iss: credentials.username,
                  sub: user.id,
                };

                var token = jwt.encode(payload, "shhh...");
                console.log(token);

                var userInfo = {
                  token: token,
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

      if (LocalStore.userInfo() == null || !LocalStore.userInfo().token)
        return false;

      var payload = jwt.decode(LocalStore.userInfo().token, "shhh...");

      if (!payload.sub)
        return false;

      return true;
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
      isAuthorized: isAuthorized,
    };
  };

  var app = angular.module("mrgApp");
  app.factory("AuthService", ['$rootScope', 'UsersService', 'LocalStore', 'SessionStore', 'AUTH_EVENTS', 'jwt', AuthService]);

}());