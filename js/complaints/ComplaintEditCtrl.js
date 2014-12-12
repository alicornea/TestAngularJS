(function(){

app.controller('ComplaintEditCtrl', function($scope, $routeParams, $location, ProjectCouch) {
  $scope.Types = getTypes();
$scope.Workgroups = getWorkgroups();

  var promise = ProjectCouch.get({
    q: '_design',
    r: 'complaint',
    s: '_view',
    t: 'getAll',
    include_docs: 'true',
    limit: 1,
    key: "\"" + $routeParams.id + "\""
  });
  promise.$promise.then(function(data) {
    $scope.complaint = data.rows[0];
  }, function(reason) {
    alert(reason);
  });

  $scope.updateComplaint = function() {
    $scope.complaint.doc.date = getCurrentDatetime();
    new ProjectCouch($scope.complaint.doc).update(function() {
      $location.path('/Complaints');
    });
  };
});

}());