(function(){

angular.module("mrgApp").factory('syncronizationSrv', ['pouchFactory',  function ('pouchFactory') {
	

	return {
		uploadChanges : function(){
			pouchFactory.sync();
		}
	};
}])	

})();