'use strict';

sydneyWildlifeApp.controller('MemberController',
    function MemberController($scope, MemberService, NavService, AlertService, $routeParams) {
	    $scope.showFeedback = false;
	    	    
	    /**
	     * Save member
	     */
	    $scope.saveMember = function (member, form) {
        	console.log(member);
        	
            if(form.$valid) {
            	var aPromise = MemberService.save(member);
            	aPromise.then(function(object){
            	   member.id = object.id;
            	   AlertService.show("success", "Successfully registered/updated member " + member.firstName + " " + member.lastName + ".");
            		NavService.goTo("/members");
            	}, function errorCallback(error) {
            	   AlertService.show("danger", "Error saving member. " + error);
            	});
            } else {
               AlertService.show("danger", "Please resolve the highlighted errors.");
            }
        };
        
        /**
         * List members
         */
        $scope.listMembers = function(){
        	MemberService.list().then(function(o){
        		$scope.memberList = o;
        	}, function(error){
        	   AlertService.show("danger", "Error retrieving members. " + error);
        	});
        };
        
        /**
         * Retrieve one member
         */
        $scope.memberDetail = function(){
        	if ($routeParams != undefined && $routeParams.memberId != undefined){
        		MemberService.memberDetail($routeParams.memberId).get().then(function(object) {
        			$scope.member = object.originalData;        		
	        	}, function(error){
	          	 AlertService.show("danger", "Error retrieving member with Id " + memberId + ". "+ error);
	        	});
        	}
        };
        
        /**
         * Delete one member
         */
        $scope.deleteMember = function (member) {
        	if (member != undefined && member.id != undefined){
        		MemberService.deleteMember(member.id).then(function(object) {
        			$scope.member = {};
        			AlertService.show("info", "Successfully deleted member with Id "+ member.id + "." );
        			NavService.goTo("/members");
	        	}, function(error){
	        	   AlertService.show("danger", "Error deleting member with Id " + member.id + ". "+ error);
	        		NavService.goTo("/members");
	        	});
        	}
        };

        $scope.isNew = function (member) {
           return member === undefined || member.id === undefined;
        };
    }
);