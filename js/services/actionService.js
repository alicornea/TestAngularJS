(function() {
    angular.module("mrgApp").factory("ActionService", ['$location', 'DateTime', 'storageSrv', '$rootScope', function($location, DateTime, storageSrv, $rootScope) {

        function getAction(actionId) {
            return storageSrv.select('_design/_actions/_view/getAll', $rootScope.online, 20, true, actionId);
        };

        function getActionsByIndex(index, numberOfResults) {
            var options = [
                ["limit", numberOfResults > 0 ? numberOfResults : 10],
                ["skip", index]
            ];

            return storageSrv.select('_design/_actions/_view/getAll', $rootScope.online, options, true);
        }

        function getActionsBasedOnComplaintIdByIndex(complaintId, index, numberOfResults) {
            var options = [
                ["limit", numberOfResults > 0 ? numberOfResults : 10],
                ["skip", index],
                ["key", "\"" + complaintId + "\""]
            ];

            return storageSrv.select('_design/_actions/_view/byCompliantId', $rootScope.online, options, true);
        }

        function saveAction(action) {
            action.changeDate = DateTime.currentDateTime();
            action.createDate = DateTime.currentDateTime();

            storageSrv.insert(action, $rootScope.online).then(function() {
                $location.path('/Complaint/' + action.complaintId);
            })
        };

        function updateAction(action) {
            action.changeDate = DateTime.currentDateTime();

            storageSrv.update(action, $rootScope.online).then(function() {
                $location.path('/Complaint/' + action.complaintId);
            })
        };
        
        function deleteAction(action) {
                storageSrv.destroy(action, $rootScope.online).then(function() {
                    $location.path('/Complaint/' + action.complaintId);
                });
            };

        return {
            getAction: getAction,
            getActionsByIndex: getActionsByIndex,
            getActionsByComplaintIdByIndex: getActionsBasedOnComplaintIdByIndex,
            saveAction: saveAction,
            updateAction: updateAction,
            deleteAction : deleteAction
        };
    }]);
}());