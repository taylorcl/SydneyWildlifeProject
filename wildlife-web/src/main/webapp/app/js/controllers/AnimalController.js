'use strict';

sydneyWildlifeApp.controller('AnimalController',
    function AnimalController($scope, AnimalService, $routeParams) {
	    $scope.showFeedback = false;
	    	    
	    /**
	     * Save animal
	     */
	    $scope.saveAnimal = function (animal, form) {
        	console.log(animal);
        	
            if(form.$valid) {
            	var aPromise = AnimalService.save(animal);
            	aPromise.then(function(object){
            	   animal.id = object.id;
            		showAlert("success", "Animal registered successfully! Just went over to sydwildlife-api webapp using Restangular and saved this animal!");
            		$scope.$root.$broadcast('goToEvent', {route: "/animals"});
            	}, function errorCallback(error) {
            		showAlert("error", error);
            		$scope.$root.$broadcast('goToEvent', {route: "/animals"});
            	});
            } else {
            	showAlert("error", "Invalid form: " + form);
            }
        };
        
        /**
         * List animals
         */
        $scope.listAnimals = function(){
        	AnimalService.list().then(function(o){
        		$scope.animalList = o;
        		if (o.length == 0){
        			showAlert("warning", "No animals registered! Checked for animals by making a call to sydwildlife-api webapp using Restangular!");
        		} else {
        			showAlert("info", "Found " + o.length + " animals! Checked for animals by making a call to sydwildlife-api webapp using Restangular!");
        		}
        	}, function(e){
        		showAlert("error", e);
        	});
        };
        
        /**
         * Retrieve one animal
         */
        $scope.animalDetail = function(){
        	if ($routeParams != undefined && $routeParams.animalId != undefined){
        		AnimalService.animalDetail($routeParams.animalId).get().then(function(object) {
        			$scope.animal = object.originalData;        		
	        	}, function(e){
	        		showAlert("error", "Error retrieving animal " + e);
	        	});
        	}
        };
        
        /**
         * Delete one animal
         */
        $scope.deleteAnimal = function (animal) {
        	if (animal != undefined && animal.id != undefined){
        	 AnimalService.deleteAnimal(animal.id).then(function(object) {
        			$scope.animal = {};
        			showAlert("info", "Deleted animal with Id: "+ animal.id );
        			$scope.$root.$broadcast('goToEvent', {route: "/animals"});
	        	}, function(e){
	        		showAlert("error", "Error deleting animals. "+ e);
	        		$scope.$root.$broadcast('goToEvent', {route: "/animals"});
	        	});
        	}
        };
        
        $scope.isNew = function (animal) {
           return animal === undefined || animal.id === undefined;
        };
        
        /**
         * Clear the animal object
         */
        $scope.createAnimal = function (animal) {
        	$scope.animal = {};
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