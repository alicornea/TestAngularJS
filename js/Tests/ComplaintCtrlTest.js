describe('ComplaintCtrl', function(){
    
    var $controller;
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    it("Should return a complaint", inject(function(ComplaintsService){
        var spyService = jasmine.createSpy('ComplaintsService');
        spyService.getComplaint(spyService);
        expect(spyService).toHaveBeenCalled();
        
    }));
});