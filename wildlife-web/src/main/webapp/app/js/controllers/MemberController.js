'use strict';

sydneyWildlifeApp.controller('MemberController',
    function MemberController($scope, MemberService, $routeParams) {
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
            		showAlert("success", "Member registered successfully! Just went over to sydwildlife-api webapp using Restangular and saved this member!");
            		$scope.$root.$broadcast('goToEvent', {route: "/members"});
            	}, function errorCallback(error) {
            		showAlert("error", error);
            		$scope.$root.$broadcast('goToEvent', {route: "/members"});
            	});
            } else {
            	showAlert("error", "Invalid form: " + form);
            }
        };
        
        /**
         * List members
         */
        $scope.listMembers = function(){
        	MemberService.list().then(function(o){
        		$scope.memberList = o;
        		if (o.length == 0){
        			showAlert("warning", "No members registered! Checked for members by making a call to sydwildlife-api webapp using Restangular!");
        		} else {
        			showAlert("info", "Found " + o.length + " members! Checked for members by making a call to sydwildlife-api webapp using Restangular!");
        		}
        	}, function(e){
        		showAlert("error", e);
        	});
        };
        
        /**
         * Retrieve one member
         */
        $scope.memberDetail = function(){
        	if ($routeParams != undefined && $routeParams.memberId != undefined){
        		MemberService.memberDetail($routeParams.memberId).get().then(function(object) {
        			$scope.member = object.originalData;        		
	        	}, function(e){
	        		showAlert("error", "Error retrieving member " + e);
	        	});
        	}
        };
        
        /**
         * Delete one member
         */
        $scope.deleteMember = function () {
        	if ($routeParams != undefined && $routeParams.memberId != undefined){
        		MemberService.deleteMember($routeParams.memberId).get().then(function(object) {
        			$scope.member = {};
        			showAlert("info", "Deleted member with Id: "+ $routeParams.memberId );
        			$scope.$root.$broadcast('goToEvent', {route: "/members"});
	        	}, function(e){
	        		showAlert("error", "Error deleting member. "+ e);
	        		$scope.$root.$broadcast('goToEvent', {route: "/members"});
	        	});
        	}
        };

        /**
         * Clear the member object
         */
        $scope.createMember = function (member) {
        	$scope.member = {};
        	this.closeAlert();
        };
        
        $scope.closeAlert = function(){
        	$scope.showFeedback = false;
        };
        
        function showAlert(type, message) {
    		$scope.status  = message;
    		$scope.showFeedback = "true";
    		$scope.alertType = type;
        }
    }
);