(function(){

app.controller('ComplaintAddCtrl', function($scope, ProjectCouch, $location) {
  $scope.Types = getTypes();
  $scope.Workgroups = getWorkgroups();
  
  $scope.saveComplaint = function() {
    $scope.complaint.doc.date = getCurrentDatetime();

    ProjectCouch.save($scope.complaint.doc, function(reason) {
      $location.path('/Complaints');
    });
  };
});

}());