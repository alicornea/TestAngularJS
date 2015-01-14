(function() {

  var AuthService = function($rootScope, LocalStore, SessionStore, AUTH_EVENTS, jwt, storageSrv, $q) {

    var login = function(credentials) {

      var promise = getUsers(credentials.username);

      return promise.then(function(result) {

          if (result.rows.length === 0) {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            return;
          }

          var user = result.rows[0];
          var userPassword = encryptPassword(credentials.password);

          if (userPassword !== user.value.password)
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);

          LocalStore.userInfo(createUserInfo({
            id: user.id,
            username: user.value.username,
            role: user.value.role
          }));
        });
    };

    var register = function(user) {

      var deferred = $q.defer();

      var promise = getUsers(user.username);

      promise.then(function(result) {
        if (result.rows.length !== 0)
          deferred.resolve(false);

        var userToRegister = createUserAccoutData(user);

        storageSrv.insert(userToRegister, true).then(function(res) {
            LocalStore.userInfo(createUserInfo({
              id: res.id,
              username: userToRegister.username,
              role: userToRegister.role
            }));

            SessionStore.successfulRegistration(true);
            deferred.resolve(true);
          }),
          function() {
            console.log("Registration failed");
            deferred.resolve(false);
          };
      });

      return deferred.promise;
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


    /* Private methods */
    
    var getUsers = function(username){
      var options = [
        ["limit", 10],
        ["key", '"' + username + '"']
      ];

      return storageSrv.select('_design/users/_view/getAll', $rootScope.online, options, true);
    };
    
    var encryptPassword = function(password) {
      return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    };

    var createUserInfo = function(user) {
      return {
        token: generateToken(user.username, user.id),
        username: user.username,
        role: user.role
      };
    };

    var generateToken = function(username, id) {
      return jwt.encode({
        username: username,
        id: id
      }, "shhh...");
    };

    var createUserAccoutData = function(user) {
      return {
        role: "guest",
        item: "users",
        password: encryptPassword(user.password),
        username: user.username,
      };
    };

    return {
      login: login,
      isAuthenticated: isAuthenticated,
      logout: logout,
      isAuthorized: isAuthorized,
      register: register,
    };
  };

  var app = angular.module("mrgApp");
  app.factory("AuthService", ['$rootScope', 'LocalStore', 'SessionStore', 'AUTH_EVENTS', 'jwt', 'storageSrv', '$q', AuthService]);

}());