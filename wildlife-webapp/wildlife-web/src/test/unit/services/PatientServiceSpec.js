'use strict';

describe('UserService Tests', function() {
    
	beforeEach(module('sydneyWildlifeApp'));
 
    var localRestangular;
    var localUserService;
    var localDateService;
    var localDateConvertorSpy;
    var deferred = null;
    var user = null;
    var user2 = null;
    var user3 = null;
    var users = [];
    
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
    
    var injectUserService = inject(function(UserService) {	    		
    	localUserService = UserService;
    });
    
    describe('Dependency Injection tests', function() {   
    	
        beforeEach(function() {          
            injectRestangular();
            injectUserService();
        });
    	
    	it('should inject deps', function() {
    		expect(localUserService).toBeDefined();
    		expect(localRestangular).toBeDefined();
    	});	
    });
    
    
    describe('Saving a user', function() {   
    	
        beforeEach(inject(function(Restangular, $q, DateService, UserService) {    
    	    localDateService = DateService;   	    
            injectRestangular();
            injectUserService();
    	    deferred.resolve(users);
    	    
    	    spyOn(localDateService, "convertMMDDYYYYToJSONDate");
    	    localDateConvertorSpy = spyOn(localDateService, "convertJSONToMMDDYYYYDate");

            user = {"id":"1", "firstName":"Joe", "lastName":"Longfellow", "visitDate":"03/04/2000", "address":"anAddress", "city":"aCity", "state":"aState"};
            user2 = {"id":"2", "firstName":"Joe2", "lastName":"Longfellow2", "visitDate":"03/04/2000", "address":"anAddress", "city":"aCity", "state":"aState"};
            user3 = {"id":"3", "firstName":"Joe3", "lastName":"Longfellow3", "visitDate":"03/04/2000", "address":"anAddress", "city":"aCity", "state":"aState"};
            
            users = [user, user2, user3];
        }));
    	
		
		it('should save user', function() {
			var returnValue = localUserService.save(user);
			expect(localRestangular.all(jasmine.any(Object)).post()).toBe(deferred.promise);
			expect(localDateService.convertMMDDYYYYToJSONDate).toHaveBeenCalledWith(user.visitDate);
			expect(returnValue).toBe(deferred.promise);
			
		});
		it('should list users', inject(function($rootScope, $compile) {
			var returnValue = localUserService.list();
			$rootScope.$digest();
			expect(localRestangular.all(jasmine.any(Object)).getList()).toBe(deferred.promise);
			expect(localDateConvertorSpy.callCount).toEqual(3);
			
		}));    	
    });
    
	afterEach(function() {
		jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
	});
});