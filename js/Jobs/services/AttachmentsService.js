(function () {
    var AttachmentsService = function (ProjectCouch) {

        var GetAttachments = function (jobId) {
            return promise = (jobId == undefined || jobId == '') ?
                ProjectCouch.get({
                    q: '_design',
                    r: 'attachment',
                    s: '_view',
                    t: 'getAll',
                    include_docs: 'true',
                    limit: 1000
                })
               : ProjectCouch.get({
                   q: '_design',
                   r: 'attachment',
                   s: '_view',
                   t: 'getAttachmentByJobId',
                   key: jobId,
                   include_docs: 'true',
                   limit: 1000
               });
        };

        return {
            GetAttachments: GetAttachments
        };
    };

    angular.module('mrgApp')
        .factory('AttachmentsService', ['ProjectCouch', AttachmentsService]);

}())