'use strict';

describe('UserController Tests', function() {
    
    var user = null;
    var localScope = null;
    var localUserController = null;
    var localUserService = null;
    var localRouteParams = null;
    var deferred = null;
    var form = null;
    
    beforeEach(module('sydneyWildlifeApp'));
	beforeEach(inject(function($rootScope, $controller, UserService, $routeParams, $q) {
		user = {"id":"1", "firstName":"Joe", "lastName":"Longfellow", "visitDate":"03/04/2000", "address":"anAddress", "city":"aCity", "state":"aState"};
	    localScope = $rootScope.$new();
	    localUserService = UserService;
	    localRouteParams = $routeParams;			    
	    localUserController = $controller('UserController', 
	    		{ $scope: localScope, UserService: localUserService, $routeParams: localRouteParams } );
	    deferred = $q.defer();
	}));
	
	afterEach(function() {
		jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
	});
		
    describe('UserController injection tests', function() {    

		it('should inject user controller', function() {
			expect(localUserController).toBeDefined();
		});	
		
		it('should set showFeedback correctly', function() {
			expect(localScope.showFeedback).toBe(false);
		});	
    });

    describe('UserController save user tests', function() {    
		//Solution based on: https://groups.google.com/forum/#!msg/angular/icQGGKZy-Is/zwnmZZdfT-0J
		it('should save user', inject(function($rootScope, $compile) {	
			form = {$valid:true};
		    deferred.resolve({"id":"xyz"});
		    spyOn(localUserService, "save").andReturn(deferred.promise);			
			localScope.saveUser(user, form);
			$rootScope.$digest();
			expect(user.id).toBe("xyz");
			expect(localScope.alertType).toBe("success");
		}));
		
		it('should not save user', inject(function($rootScope, $compile) {
			form = {$valid:true};
		    deferred.reject({});
		    spyOn(localUserService, "save").andReturn(deferred.promise);			
			localScope.saveUser(user, form);
			$rootScope.$digest();
			expect(localScope.alertType).toBe("error");
		}));
		
		it('Invalid form and should not save user', inject(function($rootScope, $compile) {
			form = {$valid:false};
		    spyOn(localUserService, "save");		
			localScope.saveUser(user, form);
			expect(localUserService.save).not.toHaveBeenCalled();
			expect(localScope.alertType).toBe("error");
		}));
		
    });

    
    describe('UserController list user tests', function() {    
		
		it('should list users == 0', inject(function($rootScope, $compile) {		    
		    deferred.resolve({"length":0});
		    spyOn(localUserService, "list").andReturn(deferred.promise);			
			localScope.listUsers();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("warning");
		}));
		
		it('should list users > 0', inject(function($rootScope, $compile) {		    
		    deferred.resolve({"length":10});
		    spyOn(localUserService, "list").andReturn(deferred.promise);			
			localScope.listUsers();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("info");
		}));		
    });

    
    describe('UserController user detail tests', function() {    
		beforeEach(inject(function($rootScope, $controller, UserService, $routeParams) {
			    localRouteParams = {"userId":"1"};
			    localUserController = $controller('UserController', 
			    		{ $scope: localScope, UserService: localUserService, $routeParams: localRouteParams } );
			    
		}));
		
		it('should show user details', inject(function($rootScope, $compile) {			
		    deferred.resolve({"originalElement":user});
		    var aTempObject = {get: function(){return deferred.promise}};
		    spyOn(localUserService, "userDetail").andReturn(aTempObject);
			localScope.userDetail();
			$rootScope.$digest();
			expect(localScope.user).toBe(user);
		}));
		
		it('should not show user details', inject(function($rootScope, $compile) {			
		    deferred.reject({});
		    var aTempObject = {get: function(){return deferred.promise}};
		    spyOn(localUserService, "userDetail").andReturn(aTempObject);
			localScope.userDetail();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("error");
		}));		
    });
    
    
    describe('UserController user deletion tests', function() {    
		beforeEach(inject(function($rootScope, $controller, UserService, $routeParams) {
			    localRouteParams = {"userId":"1"};
			    localUserController = $controller('UserController', 
			    		{ $scope: localScope, UserService: localUserService, $routeParams: localRouteParams } );
			    
		}));
		
		it('should delete users', inject(function($rootScope, $compile) {			
		    deferred.resolve({"originalElement":user});
		    var aTempObject = {get: function(){return deferred.promise}};
		    spyOn(localUserService, "deleteUser").andReturn(aTempObject);
			localScope.deleteUser();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("info");
		}));
		
		it('should not delete users', inject(function($rootScope, $compile) {			
		    deferred.reject({});
		    var aTempObject = {get: function(){return deferred.promise}};
		    spyOn(localUserService, "deleteUser").andReturn(aTempObject);
			localScope.deleteUser();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("error");
		}));		
    });

});
