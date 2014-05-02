'use strict';

sydneyWildlifeApp.controller('MemberController',
    function MemberController($scope, MemberService, NavService, AlertService, $routeParams, ALERT_CODES) {
	    $scope.showFeedback = false;
	    	    
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
            	   NavService.goTo("/members");
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
        			NavService.goTo("/members");
	        	}, function(error) {
	        		AlertService.show(ALERT_CODES.error, "Error deleting member with Id " + member.id + ".");
	        		NavService.goTo("/members");
	        	});
        	}
        };

        $scope.isNew = function (member) {
           return member === undefined || member.id === undefined;
        };
    }
);