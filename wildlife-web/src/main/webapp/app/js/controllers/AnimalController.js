'use strict';

/*
 * Animals functionalities for the controller layer
 */
sydneyWildlifeApp.controller('AnimalController',
    function AnimalController($scope, AnimalService, NavService, AlertService, $routeParams, NAV_PATHS, ALERT_CODES, POSTAL_STATES) {
       $scope.postalStates = POSTAL_STATES;
       
	    /**
	     * Save animal
	     */
	    $scope.saveAnimal = function (animal, form) {
        	console.log(animal);
        	
            if(form.$valid) {
            	var aPromise = AnimalService.save(animal);
            	aPromise.then(function(object){
            	   animal.id = object.id;
            	   AlertService.show(ALERT_CODES.success, "Successfully registered/updated animal with Id " + animal.id + ".");
            		NavService.goTo(NAV_PATHS.animalList);
            	}, function errorCallback(error) {
            	   AlertService.show(ALERT_CODES.error, "Error saving animal.");
            	});
            } else {
               AlertService.show(ALERT_CODES.warning, "Please resolve the highlighted errors.");
            }
        };
        
        /**
         * List animals
         */
        $scope.listAnimals = function(){
        	AnimalService.list().then(function(o){
        		$scope.animalList = o;
        	}, function(eerror){
        	   AlertService.show(ALERT_CODES.error, "Error retrieving animals.");
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
	        	    AlertService.show(ALERT_CODES.error, "Error retrieving animal with Id " + animalId + ".");
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
        			AlertService.show(ALERT_CODES.info, "Successfully deleted animal with Id "+ animal.id + "." );
        			NavService.goTo(NAV_PATHS.animalList);
	        	}, function(error){
	        	   AlertService.show(ALERT_CODES.error, "Error deleting animal with Id " + animal.id + ".");
	        		NavService.goTo(NAV_PATHS.animalList);
	        	});
        	}
        };
        
        $scope.isNew = function (animal) {
           return animal == undefined || animal.id == undefined;
        };
    }
);