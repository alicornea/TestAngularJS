(function () {

    var ActionService = function (ProjectCouch) {
      
        function GetActions()
        {
            console.log("getallActions");
            var promise = ProjectCouch.get({
                q: '_design',
                r: '_actions',
                s: '_view',
                t: 'getAll',
                include_docs: 'true',
                limit: 10
            });
            return promise;
        }

        function GetActionsBasedOnComplaintId(complaintId) {
            console.log("getactionsbased on compliant");
            var promise = ProjectCouch.get({
                q: '_design',
                r: '_actions',
                s: '_view',
                t: 'byCompliantId',
                key: "\"" + complaintId + "\"",
                include_docs: 'true',
                limit: 10
            });
            return promise;
        }

        function GetAllStatuses()
        {
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

        return { GetAllActions: GetActions, GetActionsByComplaintId: GetActionsBasedOnComplaintId, GetStatuses: GetAllStatuses };
    };

    var app = angular.module("mrgApp");
    app.factory("ActionService", ["ProjectCouch", ActionService]);


}());
