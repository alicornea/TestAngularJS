(function() {
    angular.module("mrgApp").factory("ActionService", ["ProjectCouch", function(ProjectCouch) {

        function getActionsByIndex(index, numberOfResults, online) {

            return ProjectCouch.get({
                q: '_design',
                r: '_actions',
                s: '_view',
                t: 'getAll',
                include_docs: 'true',
                skip: index,
                limit: numberOfResults > 0 ? numberOfResults : 10
            }).$promise;
        }

        function getActionsBasedOnComplaintIdByIndex(complaintId, index, numberOfResults, online) {

            return ProjectCouch.get({
                q: '_design',
                r: '_actions',
                s: '_view',
                t: 'byCompliantId',
                include_docs: 'true',
                key: "\"" + complaintId + "\"",
                skip: index,
                limit: numberOfResults > 0 ? numberOfResults : 10
            }).$promise;
        }

        function getAllStatuses() {
            console.log("getallStatuses");
            var promise = ProjectCouch.get({
                q: '_design',
                r: 'statusAction',
                s: '_view',
                t: 'getAll',
                include_docs: 'true',
                limit: 10
            });
            return promise;

        }

        return {
            getActionsByIndex: getActionsByIndex,
            getActionsByComplaintIdByIndex: getActionsBasedOnComplaintIdByIndex,
            GetStatuses: getAllStatuses
        };
    }]);
}());