(function() {
    var app = angular.module("mrgApp");

    var AttachmentsCtrl = function($scope, $location, $routeParams, ProjectCouch, DateTime) {
        console.log("Attachements reporting for duty.");

        var self = this;

        ProjectCouch.get({q: $routeParams.jobid}, function(job) {
            self.original = job;
            $scope.job = new ProjectCouch(self.original);
        });

        $scope.isClean = function() {
            return angular.equals(self.original, $scope.job);
        }

        $scope.save = function() {

            var filename = $('input[type=file]').val().split('\\').pop();
            
            var file = document.getElementById('_attachments').files[0];

            var reader = new FileReader();

            reader.onload = function(readerEvt) {
                var binaryString = readerEvt.target.result;

                var dataObject = {
                    'item': "attachment",
                    'date': DateTime.getCurrentDate(),
                    'text': $('message').val(),
                    'jobId': $scope.job.jobNo,
                    "_attachments": {
                    }
                };
                //only way to add use variable for property name
                dataObject.attachment[filename] = {
                            "content_type": "application/text",
                            "data": btoa(binaryString)
                        };

                $.ajax({
                    url: 'https://alicornea.iriscouch.com/test_angular',
                    type: 'POST',
                    data: JSON.stringify(dataObject),
                    contentType: 'application/json',
                    success: function(result) {
                        alert("success!");
                    },
                    error: function(result) {
                        alert('error');
                    }
                });
            };

            reader.readAsDataURL(file);
        };

    };

    app.controller("AttachmentsCtrl", ['$scope', '$location', '$routeParams', 'ProjectCouch', 'DateTime', AttachmentsCtrl]);
}());