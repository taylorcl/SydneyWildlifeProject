'use strict';

describe('MemberService Tests', function() {
    
	beforeEach(module('sydneyWildlifeApp'));
 
    var localRestangular;
    var localMemberService;
    var deferred = null;
    var member = null;
    var member2 = null;
    var member3 = null;
    var members = [];
    
    var injectRestangular = inject(function(Restangular, $q) {	    		
		localRestangular = Restangular;
	    //Set mocks
	    deferred = $q.defer();
	    spyOn(Restangular, "all").andReturn({
	    	post: function(){
	    		return deferred.promise;
	    	},
	    	getList: function(){
	    		return deferred.promise;
	    	}
	    });
    });
    
    var injectMemberService = inject(function(MemberService) {	    		
    	localMemberService = MemberService;
    });
    
    describe('Dependency Injection tests', function() {   
    	
        beforeEach(function() {          
            injectRestangular();
            injectMemberService();
        });
    	
    	it('should inject deps', function() {
    		expect(localMemberService).toBeDefined();
    		expect(localRestangular).toBeDefined();
    	});	
    });
    
    
    describe('Saving a member', function() {   
    	
        beforeEach(inject(function(Restangular, $q, MemberService) {    
            injectRestangular();
            injectMemberService();
    	    deferred.resolve(members);
    	    
            member = {"id":"1", "firstName":"Joe", "lastName":"Longfellow", "address":"anAddress", "city":"aCity", "state":"aState"};
            member2 = {"id":"2", "firstName":"Joe2", "lastName":"Longfellow2", "address":"anAddress", "city":"aCity", "state":"aState"};
            member3 = {"id":"3", "firstName":"Joe3", "lastName":"Longfellow3", "address":"anAddress", "city":"aCity", "state":"aState"};
            
            members = [member, member2, member3];
        }));
    	
		
		it('should save member', function() {
			var returnValue = localMemberService.save(member);
			expect(returnValue).toBe(deferred.promise);
			
		});
		it('should list members', inject(function($rootScope, $compile) {
			var returnValue = localMemberService.list();
			$rootScope.$digest();
			expect(localRestangular.all(jasmine.any(Object)).getList()).toBe(deferred.promise);
		}));    	
    });
    
	afterEach(function() {
		jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
	});
});