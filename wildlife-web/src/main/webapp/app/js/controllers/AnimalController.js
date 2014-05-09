'use strict';

/*
 * Animals functionalities for the controller layer
 */
sydneyWildlifeApp.controller('AnimalController', function AnimalController($scope, AnimalService,
    NavService, NotifService, $routeParams, NAV_PATHS, ALERT_TYPES, LOAD_TYPES, LOG_TYPES,
    POSTAL_STATES) {
  $scope.postalStates = POSTAL_STATES;

  /**
   * Save animal
   */
  $scope.saveAnimal = function(animal, form) {
    console.log(animal);

    if (form.$valid) {
      NotifService.load(LOAD_TYPES.start);
      var aPromise = AnimalService.save(animal);
      aPromise.then(function(object) {
        NotifService.load(LOAD_TYPES.stop);
        animal.id = object.id;
        NavService.goTo(NAV_PATHS.animalList);
      }, function errorCallback(error) {
        NotifService.load(LOAD_TYPES.stop);
        NotifService.log(LOG_TYPES.error, "Error saving animal.");
        NotifService.alert(ALERT_TYPES.error, "Error saving animal.");
      });
    } else {
      NotifService.alert(ALERT_TYPES.warning, "Please resolve the highlighted errors.");
    }
  };

  /**
   * List animals
   */
  $scope.listAnimals = function() {
    NotifService.load(LOAD_TYPES.start);
    AnimalService.list().then(function(o) {
      NotifService.load(LOAD_TYPES.stop);
      $scope.animalList = o;
    }, function(error) {
      NotifService.load(LOAD_TYPES.stop);
      NotifService.log(LOG_TYPES.error, "Error retrieving animals.");
      NotifService.alert(ALERT_TYPES.error, "Error retrieving animals.");
    });
  };

  /**
   * Retrieve one animal
   */
  $scope.animalDetail = function() {
    if ($routeParams != undefined && $routeParams.animalId != undefined) {
      NotifService.load(LOAD_TYPES.start);
      AnimalService.animalDetail($routeParams.animalId).get().then(function(object) {
        NotifService.load(LOAD_TYPES.stop);
        $scope.animal = object.originalData;
      }, function(error) {
        NotifService.load(LOAD_TYPES.stop);
        NotifService.log(LOG_TYPES.error, "Error retrieving animal with Id " + animalId + ".");
        NotifService.alert(ALERT_TYPES.error, "Error retrieving animal with Id " + animalId + ".");
      });
    }
  };

  /**
   * Delete one animal
   */
  $scope.deleteAnimal = function(animal) {
    if (animal != undefined && animal.id != undefined) {
      NotifService.load(LOAD_TYPES.start);
      AnimalService.deleteAnimal(animal.id).then(function(object) {
        NotifService.load(LOAD_TYPES.stop);
        $scope.animal = {};
        NotifService.log(LOG_TYPES.info, "Successfully deleted animal with Id " + animal.id + ".");
        NavService.goTo(NAV_PATHS.animalList);
      }, function(error) {
        NotifService.load(LOAD_TYPES.stop);
        NotifService.log(LOG_TYPES.error, "Error deleting animal with Id " + animal.id + ".");
        NotifService.alert(ALERT_TYPES.error, "Error deleting animal with Id " + animal.id + ".");
        NavService.goTo(NAV_PATHS.animalList);
      });
    }
  };

  $scope.isNew = function(animal) {
    return animal == undefined || animal.id == undefined;
  };
});