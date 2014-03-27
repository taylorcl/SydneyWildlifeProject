'use strict';

sydneyWildlifeApp.controller('AnimalController',
    function AnimalController($scope, AnimalService, NavService, AlertService, $routeParams) {
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
            	   AlertService.show("success", "Successfully registered/updated animal with Id " + animal.id + ".");
            		NavService.goTo("/animals");
            	}, function errorCallback(error) {
            	   AlertService.show("error", "Error saving animal. " + error);
            	});
            } else {
               AlertService.show("error", "Please resolve the following errors: " + form);
            }
        };
        
        /**
         * List animals
         */
        $scope.listAnimals = function(){
        	AnimalService.list().then(function(o){
        		$scope.animalList = o;
        	}, function(eerror){
        	   AlertService.show("error", "Error retrieving animals. " + error);
        	});
        };
        
        /**
         * Retrieve one animal
         */
        $scope.animalDetail = function(){
        	if ($routeParams != undefined && $routeParams.animalId != undefined){
        		AnimalService.animalDetail($routeParams.animalId).get().then(function(object) {
        			$scope.animal = object.originalData;        		
	        	}, function(error){
	        	    AlertService.show("error", "Error retrieving animal with Id " + animalId + ". "+ error);
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
        			AlertService.show("info", "Successfully deleted animal with Id "+ animal.id + "." );
        			NavService.goTo("/animals");
	        	}, function(error){
	        	   AlertService.show("error", "Error deleting animal with Id " + animal.id + ". "+ error);
	        		NavService.goTo("/animals");
	        	});
        	}
        };
        
        $scope.isNew = function (animal) {
           return animal === undefined || animal.id === undefined;
        };
    }
);