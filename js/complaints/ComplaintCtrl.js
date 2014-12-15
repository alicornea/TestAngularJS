(function(){
var app = angular.module("mrgApp");
app.controller('ComplaintCtrl', function($scope, $routeParams, ProjectCouch) {
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
});

}());