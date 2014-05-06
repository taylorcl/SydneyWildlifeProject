'use strict';

/*
 * Members functionalities for the controller layer
 */
sydneyWildlifeApp.controller('MemberController',
    function MemberController($scope, MemberService, NavService, AlertService, $routeParams, NAV_PATHS, USER_ROLES, ALERT_CODES, POSTAL_STATES) {
	    $scope.postalStates = POSTAL_STATES;
	    	    
	    /**
	     * Save member
	     */
	    $scope.saveMember = function(member, form) {
        	console.log(member);
        	
            if(form.$valid) {
            	var aPromise = MemberService.save(member);
            	aPromise.then(function(object) {
            	   member.id = object.id;
            	   AlertService.show(ALERT_CODES.success, "Successfully registered/updated member " + member.firstName + " " + member.lastName + ".");
            	   NavService.goTo(NAV_PATHS.memberList);
            	}, function errorCallback(error) {
            	   AlertService.show(ALERT_CODES.error, "Error saving member with Id " + member.id + ".");
            	});
            } else {
               AlertService.show(ALERT_CODES.warning, "Please resolve the highlighted errors.");
            }
        };
        
        /**
         * List members
         */
        $scope.listMembers = function() {
        	MemberService.list().then(function(object) {
        		$scope.memberList = object;
        	}, function(error) {
        	   AlertService.show(ALERT_CODES.error, "Error retrieving members.");
        	});
        };
        
        /**
         * Retrieve one member
         */
        $scope.memberDetail = function(){
        	if ($routeParams != undefined && $routeParams.memberId != undefined) {
        		MemberService.memberDetail($routeParams.memberId).get().then(function(object) {
        			$scope.member = object.originalData;        		
	        	}, function(error) {
	        		AlertService.show(ALERT_CODES.error, "Error retrieving member with Id " + $routeParams.memberId + ".");
	        	});
        	}
        };
        
        /**
         * Delete one member
         */
        $scope.deleteMember = function(member) {
        	console.log(member);
        	
        	if (member != undefined && member.id != undefined){
        		MemberService.deleteMember(member.id).then(function(object) {
        			$scope.member = {};
        			AlertService.show(ALERT_CODES.info, "Successfully deleted member with Id "+ member.id + "." );
        			NavService.goTo(NAV_PATHS.memberList);
	        	}, function(error) {
	        		AlertService.show(ALERT_CODES.error, "Error deleting member with Id " + member.id + ".");
	        		NavService.goTo(NAV_PATHS.memberList);
	        	});
        	}
        };
        
        $scope.cancel = function() {
           if($scope.isAuthorized(USER_ROLES.admin)) {
              NavService.goTo(NAV_PATHS.memberList);
           } else {
              NavService.goTo(NAV_PATHS.home);
           }
        };

        $scope.isNew = function (member) {
           return member == undefined || member.id == undefined;
        };
    }
);