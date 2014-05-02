'use strict';

describe('MemberController Tests', function() {
    
    var member = null;
    var localScope = null;
    var localMemberController = null;
    var localMemberService = null;
    var localNavService = null;
    var localAlertService = null;
    var localRouteParams = null;
    var deferred = null;
    var form = null;
    
    beforeEach(module('sydneyWildlifeApp'));
	beforeEach(inject(function($rootScope, $controller, MemberService, NavService, AlertService, $routeParams, $q) {
		member = {"id":"1", "firstName":"Joe", "lastName":"Longfellow"};
	    localScope = $rootScope.$new();
	    localMemberService = MemberService;
	    localNavService = NavService;
	    localAlertService = AlertService;
	    localRouteParams = $routeParams;			    
	    localMemberController = $controller('MemberController', 
	    		{ $scope: localScope, MemberService: localMemberService, NavService: localNavService, AlertService: localAlertService, $routeParams: localRouteParams } );
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
		    spyOn(localAlertService, "show");
			localScope.saveMember(member, form);
			$rootScope.$digest();
			expect(member.firstName).toBe("Joe");
			expect(localAlertService.show).toHaveBeenCalledWith('success', 'Successfully registered/updated member ' + member.firstName + ' ' + member.lastName + '.');
		}));
		
		it('should not save member', inject(function($rootScope, $compile) {
			form = {$valid:true};
		    deferred.reject({});
		    spyOn(localMemberService, "save").andReturn(deferred.promise);
		    spyOn(localAlertService, "show");
			localScope.saveMember(member, form);
			$rootScope.$digest();
			expect(localAlertService.show).toHaveBeenCalledWith('danger', jasmine.any(String));
		}));
		
		it('Invalid form and should not save member', inject(function($rootScope, $compile) {
			form = {$valid:false};
		    spyOn(localMemberService, "save");
		    spyOn(localAlertService, "show");
			localScope.saveMember(member, form);
			expect(localMemberService.save).not.toHaveBeenCalled();
			expect(localAlertService.show).toHaveBeenCalledWith('warning', jasmine.any(String));
		}));
    });

    
    describe('MemberController list member tests', function() {    
		
		it('should list members == 0', inject(function($rootScope, $compile) {		    
		    deferred.resolve({"length":0});
		    spyOn(localMemberService, "list").andReturn(deferred.promise);
		    spyOn(localAlertService, "show");
			localScope.listMembers();
			$rootScope.$digest();
			expect(localScope.memberList.length).toBe(0);
			expect(localAlertService.show).not.toHaveBeenCalled();
		}));
		
		it('should list members > 0', inject(function($rootScope, $compile) {		    
		    deferred.resolve({"length":10});
		    spyOn(localMemberService, "list").andReturn(deferred.promise);
		    spyOn(localAlertService, "show");
			localScope.listMembers();
			$rootScope.$digest();
			expect(localScope.memberList.length).toBe(10);
			expect(localAlertService.show).not.toHaveBeenCalled();
		}));		
    });

    
    describe('MemberController member detail tests', function() {    
		beforeEach(inject(function($rootScope, $controller, MemberService, $routeParams) {
			    localRouteParams = {"memberId":"1"};
			    localMemberController = $controller('MemberController', 
			    		{ $scope: localScope, MemberService: localMemberService, NavService: localNavService, AlertService: localAlertService, $routeParams: localRouteParams } );
		}));
		
		it('should show member details', inject(function($rootScope, $compile) {			
		    deferred.resolve({"originalData":member});
		    var aTempObject = {
	    		get: function() {
	    			return deferred.promise;
    			}
		    };
		    spyOn(localMemberService, "memberDetail").andReturn(aTempObject);
			localScope.memberDetail();
			$rootScope.$digest();
			expect(localScope.member).toBe(member);
		}));
		
		it('should not show member details', inject(function($rootScope, $compile) {			
		    deferred.reject({});
		    var aTempObject = {
	    		get: function() {
	    			return deferred.promise;
    			}
		    };
		    spyOn(localMemberService, "memberDetail").andReturn(aTempObject);
		    spyOn(localAlertService, "show");
			localScope.memberDetail();
			$rootScope.$digest();
			expect(localAlertService.show).toHaveBeenCalledWith('danger', jasmine.any(String));
		}));		
    });
    
    
    describe('MememberController member deletion tests', function() {    
		beforeEach(inject(function($rootScope, $controller, MemberService, $routeParams) {
				localRouteParams = {};
			    localMemberController = $controller('MemberController', 
			    		{ $scope: localScope, MemberService: localMemberService, NavService: localNavService, AlertService: localAlertService, $routeParams: localRouteParams } );
			    
		}));
		
		it('should delete members', inject(function($rootScope, $compile) {
			deferred.resolve({"id":"1"});
		    spyOn(localMemberService, "deleteMember").andReturn(deferred.promise);
		    spyOn(localAlertService, "show");
			localScope.deleteMember(member);
			$rootScope.$digest();
			expect(localAlertService.show).toHaveBeenCalledWith('info', 'Successfully deleted member with Id ' + member.id + '.');
		}));
		
		it('should not delete members', inject(function($rootScope, $compile) {			
		    deferred.reject({});
		    spyOn(localMemberService, "deleteMember").andReturn(deferred.promise);
		    spyOn(localAlertService, "show");
			localScope.deleteMember(member);
			$rootScope.$digest();
			expect(localAlertService.show).toHaveBeenCalledWith('danger', jasmine.any(String));
		}));		
    });

});
