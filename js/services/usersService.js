(function() {
    angular.module("mrgApp").factory("UsersService", function(ProjectCouch) {
        var getUsers = function(username) {
            return ProjectCouch.get({
                q: '_design',
                r: 'users',
                s: '_view',
                t: 'getAll',
                include_docs: 'true',
                limit: 10,
                key: '"' + username + '"'
            });
        };
        
        return {
            getUsers: getUsers
        };
    });
}());