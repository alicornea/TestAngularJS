describe('ComplaintCtrl', function(){
    //variable declarations
    var COMPLAINT, complaintsServiceMock,  $rootScope, $q, $controller, dataServiceMock;
   
    
    beforeEach(module('mrgApp'));
    
    beforeEach(module(function($provide){
    COMPLAINT = [{"rows":[
{"id":"3e946687c83f0d421a28e14e6c00897e","key":"3e946687c83f0d421a28e14e6c00897e","value":{"_id":"3e946687c83f0d421a28e14e6c00897e","_rev":"1-832ef8318ccfd6b116228f301abb59c5","item":"complaint","refNo":"123456-1013","text":"dummy1013","type":"Type 2","workgroup":"Borkgroup B","date":"12/19/2014 13:50:48"},"doc":{"_id":"3e946687c83f0d421a28e14e6c00897e","_rev":"1-832ef8318ccfd6b116228f301abb59c5","item":"complaint","refNo":"123456-1013","text":"dummy1013","type":"Type 2","workgroup":"Borkgroup B","date":"12/19/2014 13:50:48"}}
]}]; 
    complaintsServiceMock = {};  
    dataServiceMock={};
    $provide.value('ComplaintsService', complaintsServiceMock);
    $provide.value('DataService', dataServiceMock);
    })); 
  
    beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _ComplaintsService_,_DataService_){
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $q=_$q_;
        ComplaintsService = _ComplaintsService_;
        DataService = _DataService_;
    }));
    
     var createController = function() {
      return $controller('ComplaintCtrl', {
             $scope: $rootScope
    })
  };
    
   
    
    describe('on init',  function(){
        var getComplaintsDeferred;
        
        var resolve = function(results) {
         getComplaintsDeferred.resolve(results);
          $rootScope.$apply();
     }

    var reject = function(reason) {
      getComplaintsDeferred.reject(reason);
      $rootScope.$apply();
    }
    
     beforeEach(function() {
      getComplaintsDeferred = $q.defer();
      complaintsServiceMock.getComplaint = function() {
        return getComplaintsDeferred.promise;
      };
      createController();
    });

        it('should populate the complaint', function(){
            resolve(COMPLAINT[0]);
            expect($rootScope.complaint).not.toBe([]);
        })
        
    }
        );
    
    // it('should set success to be false if rejected', function() {
    //   reject();
    //   expect($rootScope.success).toBe(false);
    // });

 });
 

 
 

