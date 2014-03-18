'use strict';

sydneyWildlifeApp.controller('UserController',
    function UserController($scope, UserService, $routeParams) {
	    $scope.showFeedback = false;
	    	    
	    /**
	     * Save user
	     */
	    $scope.saveUser = function (user, form) {
        	console.log(user);
        	
            if(form.$valid) {
            	var aPromise = UserService.save(user);
            	aPromise.then(function(object){
            		user.id = object.id;
            		showAlert("success", "User registered successfully! Just went over to sydwildlife-api webapp using Restangular and saved this user!");
            	}, function errorCallback(error) {
            		showAlert("error", error);
            	});
            } else {
            	showAlert("error", "Invalid form: " + form);
            }
        };
        
        /**
         * List users
         */
        $scope.listUsers = function(){
        	UserService.list().then(function(o){
        		$scope.userList = o;
        		if (o.length == 0){
        			showAlert("warning", "No users registered! Checked for users by making a call to sydwildlife-api webapp using Restangular!");
        		} else {
        			showAlert("info", "Found " + o.length + " users! Checked for users by making a call to sydwildlife-api webapp using Restangular!");
        		}
        	}, function(e){
        		showAlert("error", e);
        	});
        };
        
        /**
         * Retrieve one user
         */
        $scope.userDetail = function(){
        	if ($routeParams != undefined && $routeParams.userId != undefined){
        		UserService.userDetail($routeParams.userId).get().then(function(object) {
        			$scope.user  = object.originalElement;        		
	        	}, function(e){
	        		showAlert("error", "Error retrieving user " + e);
	        	});
        	}
        };
        
        /**
         * Delete one user
         */
        $scope.deleteUser = function () {
        	if ($routeParams != undefined && $routeParams.userId != undefined){
        		UserService.deleteUser($routeParams.userId).get().then(function(object) {
        			$scope.user  = {};
        			showAlert("info", "Deleted user with Id: "+ $routeParams.userId );
	        	}, function(e){
	        		showAlert("error", "Error deleting user. "+ e);
	        	});
        	}
        };

        /**
         * Clear the user object
         */
        $scope.newUser = function (user) {
        	$scope.user = {};
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