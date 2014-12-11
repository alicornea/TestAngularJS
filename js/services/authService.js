(function() {

  var AuthService = function($resource) {

    var login = function(credentials) {
      var promise = $resource(':protocol//:server/:db/:q/:r/:s/:t', {
        protocol: 'http:',
        server: 'alicornea.iriscouch.com',
        db: 'test_angular',
	q: '_design',
        r: 'users',
        s: '_view',
        t: 'getAll',
        include_docs: 'true',
        limit: 10
      }, {
        get: {
          method: 'GET'
        }
      }).get();


      return promise.$promise
        .then(function(result) {
          return result;
        }, function(reason) {
          //reason;
        });
    };

    var isAuthenticated = function() {
      //return !!Session.userId;
    };

    return {
      login: login,
      isAuthenticated: isAuthenticated,
    };
  };

  var app = angular.module("tutorialWebApp");
  app.factory("AuthService", ['$resource', AuthService]);

}());