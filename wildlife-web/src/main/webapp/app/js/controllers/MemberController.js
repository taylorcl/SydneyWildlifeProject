'use strict';

/*
 * Members functionalities for the controller layer
 */
sydneyWildlifeApp.controller('MemberController',
    function MemberController($scope, $window, $timeout, MemberService, NavService, AlertService, $routeParams, NAV_PATHS, USER_ROLES, ALERT_CODES) {
	    $scope.originalMember = null;
	    $scope.memberDetailLoading = false;
	    $scope.editMode = false;
	    	    
	    /**
	     * Save member
	     */
	    $scope.saveMember = function(member, form) {
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
        $scope.memberDetail = function() {
        	if ($routeParams != undefined && $routeParams.memberId != undefined) {
        	   $scope.memberDetailLoading = true;
        		MemberService.memberDetail($routeParams.memberId).get().then(function(object) {
        		   $scope.memberDetailLoading = false;
        			$scope.member = object.originalData;
        			//do a clone of the original object
        			$scope.originalMember = JSON.parse(JSON.stringify(object.originalData));
	        	}, function(error) {
	        	   $scope.memberDetailLoading = false;
	        		AlertService.show(ALERT_CODES.error, "Error retrieving member with Id " + $routeParams.memberId + ".");
	        	});
        	}
        };
        
        /**
         * Delete one member
         */
        $scope.deleteMember = function(member) {
        	if (member != undefined && member.id != undefined){
        	   // need to wrap this method in a timeout, otherwise a "$digest already in progress" exception is raised, this is due to the tooltip over the delete button
        	   // this is a known issue in angular: https://github.com/angular/angular.js/issues/6364
        	   $timeout(function() {
           	   var deleteConfirmed = $window.confirm("Are you sure you want to permanently delete member " + member.firstName + " " + member.lastName + "?");
           	   if(deleteConfirmed) {
              		MemberService.deleteMember(member.id).then(function(object) {
              			$scope.member = {};
              			AlertService.show(ALERT_CODES.info, "Successfully deleted member with Id "+ member.id + "." );
              			NavService.goTo(NAV_PATHS.memberList);
      	        	}, function(error) {
      	        		AlertService.show(ALERT_CODES.error, "Error deleting member with Id " + member.id + ".");
      	        		NavService.goTo(NAV_PATHS.memberList);
      	        	});
           	   }
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

        $scope.isNew = function() {
           //shouldn't retrun true when an error occurred for retrieving a member
           return !$scope.memberDetailLoading && ($scope.member == undefined || $scope.member.id == undefined);
        };
        
        $scope.getMode = function() {
           if($scope.isNew()) {
              return "create";
           } else {
              if ($scope.editMode) {
                 return "update";
              } else {
                 return "read";
              }
           }
        };
        
        $scope.startEdit = function () {
           $scope.editMode = true;
        };
        
        $scope.cancelEdit = function () {
           $scope.editMode = false;
        };
    }
);