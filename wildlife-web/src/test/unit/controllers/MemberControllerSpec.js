'use strict';

describe('MemberController Tests', function() {
    
    var member = null;
    var localScope = null;
    var localMemberController = null;
    var localMemberService = null;
    var localRouteParams = null;
    var deferred = null;
    var form = null;
    
    beforeEach(module('sydneyWildlifeApp'));
	beforeEach(inject(function($rootScope, $controller, MemberService, $routeParams, $q) {
		member = {"id":"1", "firstName":"Joe", "lastName":"Longfellow"};
	    localScope = $rootScope.$new();
	    localMemberService = MemberService;
	    localRouteParams = $routeParams;			    
	    localMemberController = $controller('MemberController', 
	    		{ $scope: localScope, MemberService: localMemberService, $routeParams: localRouteParams } );
	    deferred = $q.defer();
	}));
	
	afterEach(function() {
		jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
	});
		
    describe('MemberController injection tests', function() {    

		it('should inject member controller', function() {
			expect(localMemberController).toBeDefined();
		});	
		
		it('should set showFeedback correctly', function() {
			expect(localScope.showFeedback).toBe(false);
		});	
    });

    describe('MemberController save member tests', function() {    
		//Solution based on: https://groups.google.com/forum/#!msg/angular/icQGGKZy-Is/zwnmZZdfT-0J
		it('should save member', inject(function($rootScope, $compile) {	
			form = {$valid:true};
		    deferred.resolve({"firstName":"Joe"});
		    spyOn(localMemberService, "save").andReturn(deferred.promise);			
			localScope.saveMember(member, form);
			$rootScope.$digest();
			expect(member.firstName).toBe("Joe");
			expect(localScope.alertType).toBe("success");
		}));
		
		it('should not save member', inject(function($rootScope, $compile) {
			form = {$valid:true};
		    deferred.reject({});
		    spyOn(localMemberService, "save").andReturn(deferred.promise);			
			localScope.saveMember(member, form);
			$rootScope.$digest();
			expect(localScope.alertType).toBe("error");
		}));
		
		it('Invalid form and should not save member', inject(function($rootScope, $compile) {
			form = {$valid:false};
		    spyOn(localMemberService, "save");		
			localScope.saveMember(member, form);
			expect(localMemberService.save).not.toHaveBeenCalled();
			expect(localScope.alertType).toBe("error");
		}));
		
    });

    
    describe('MemberController list member tests', function() {    
		
		it('should list members == 0', inject(function($rootScope, $compile) {		    
		    deferred.resolve({"length":0});
		    spyOn(localMemberService, "list").andReturn(deferred.promise);			
			localScope.listMembers();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("warning");
		}));
		
		it('should list members > 0', inject(function($rootScope, $compile) {		    
		    deferred.resolve({"length":10});
		    spyOn(localMemberService, "list").andReturn(deferred.promise);			
			localScope.listMembers();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("info");
		}));		
    });

    
    describe('MemberController member detail tests', function() {    
		beforeEach(inject(function($rootScope, $controller, MemberService, $routeParams) {
			    localRouteParams = {"memberId":"1"};
			    localMemberController = $controller('MemberController', 
			    		{ $scope: localScope, MemberService: localMemberService, $routeParams: localRouteParams } );
			    
		}));
		
		it('should show member details', inject(function($rootScope, $compile) {			
		    deferred.resolve({"originalData":member});
		    var aTempObject = {get: function(){return deferred.promise}};
		    spyOn(localMemberService, "memberDetail").andReturn(aTempObject);
			localScope.memberDetail();
			$rootScope.$digest();
			expect(localScope.member).toBe(member);
		}));
		
		it('should not show member details', inject(function($rootScope, $compile) {			
		    deferred.reject({});
		    var aTempObject = {get: function(){return deferred.promise}};
		    spyOn(localMemberService, "memberDetail").andReturn(aTempObject);
			localScope.memberDetail();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("error");
		}));		
    });
    
    
    describe('MememberController member deletion tests', function() {    
		beforeEach(inject(function($rootScope, $controller, MemberService, $routeParams) {
		   localRouteParams = {};
			    localMemberController = $controller('MemberController', 
			    		{ $scope: localScope, MemberService: localMemberService, $routeParams: localRouteParams} );
			    
		}));
		
		it('should delete members', inject(function($rootScope, $compile) {
		   deferred.resolve({"id":"1"});
		    var aTempObject = {get: function(){return deferred.promise}};
		    spyOn(localMemberService, "deleteMember").andReturn(aTempObject);
			localScope.deleteMember(member);
			$rootScope.$digest();
			expect(localScope.alertType).toBe("info");
		}));
		
		it('should not delete members', inject(function($rootScope, $compile) {			
		    deferred.reject({});
		    var aTempObject = {get: function(){return deferred.promise}};
		    spyOn(localMemberService, "deleteMember").andReturn(aTempObject);
			localScope.deleteMember(member);
			$rootScope.$digest();
			expect(localScope.alertType).toBe("error");
		}));		
    });

});
