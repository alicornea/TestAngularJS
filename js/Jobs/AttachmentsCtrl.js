(function() {
    var app = angular.module("mrgApp");

    var AttachmentsCtrl = function($scope, $location, ProjectCouch) {
        console.log("Attachements reporting for duty.");

        var self = this;

        ProjectCouch.get({
            q: $routeParams.jobid
        }, function(job) {
            self.original = job;
            $scope.job = new ProjectCouch(self.original);
        });

        $scope.isClean = function() {
            return angular.equals(self.original, $scope.job);
        }

        $scope.save = function() {

            // Get the user supplied details
            var input_db = $('.documentForm input#_db').val()
            var input_id = $('.documentForm input#_id').val()
            var input_rev = $('.documentForm input#_rev').val()

            // Start by trying to open a Couch Doc at the _id and _db specified
            $.couch.db(input_db).openDoc(input_id, {
                    // If found, then set the revision in the form and save
                    success: function(couchDoc) {
                        // Defining a revision on saving over a Couch Doc that exists is required.
                        // This puts the last revision of the Couch Doc into the input#rev field
                        // so that it will be submitted using ajaxSubmit.
                        $('.documentForm input#_rev').val(couchDoc._rev);

                        // Submit the form with the attachment
                        $('form.documentForm').ajaxSubmit({
                            url: "/" + input_db + "/" + input_id,
                            success: function(response) {
                                alert("Your attachment was submitted.")
                            }
                        })
                    }, // End success, we have a Doc

                    // If there is no CouchDB document with that ID then we'll need to create it before we can attach a file to it.
                    error: function(status) {
                            $.couch.db(input_db).saveDoc({
                                "_id": input_id
                            }, {
                                success: function(couchDoc) {
                                    // Now that the Couch Doc exists, we can submit the attachment,
                                    // but before submitting we have to define the revision of the Couch
                                    // Doc so that it gets passed along in the form submit.
                                    $('.documentForm input#_rev').val(couchDoc.rev);
                                    $('form.documentForm').ajaxSubmit({
                                        // Submit the form with the attachment
                                        url: "/" + input_db + "/" + input_id,
                                        success: function(response) {
                                            alert("Your attachment was submitted.")
                                        }
                                    })
                                }
                            })
                        } // End error, no Doc

                }) // End openDoc()

            /*$scope.job.date = DateTime.currentDateTime();
            $scope.job.update(function() {
                $location.path('/jobs');
            });*/
        };

    };

    app.controller("AttachmentsCtrl", ['$scope', '$location', 'ProjectCouch', AttachmentsCtrl]);
}());