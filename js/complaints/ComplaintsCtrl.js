(function(){

app.controller('ComplaintsCtrl', function($scope, $location, ProjectCouch) {
  $scope.Types = getTypes();
  $scope.Workgroups = getWorkgroups();

  var promise = ProjectCouch.get({
    q: '_design',
    r: 'complaint',
    s: '_view',
    t: 'getAll',
    include_docs: 'true',
    limit: 20
  });
  promise.$promise.then(function(data) {
    $scope.Complaints = data.rows;
  }, function(reason) {
    alert(reason);
  });

  $scope.deleteComplaint = function deleteComplaint(complaint) {
    new ProjectCouch(complaint).destroy(function() {
      $location.path('/Complaints');
    });
  };
});

}());