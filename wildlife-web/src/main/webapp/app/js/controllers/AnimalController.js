'use strict';

/*
 * Animals functionalities for the controller layer
 */
sydneyWildlifeApp.controller('AnimalController', function AnimalController($scope, AnimalService,
    NavService, AlertService, $routeParams, NAV_PATHS, ALERT_CODES, POSTAL_STATES) {
  $scope.postalStates = POSTAL_STATES;

  /**
   * Save animal
   */
  $scope.saveAnimal = function(animal, form) {
    console.log(animal);

    if (form.$valid) {
      $scope.startLoading();
      var aPromise = AnimalService.save(animal);
      aPromise.then(function(object) {
        $scope.stopLoading();
        animal.id = object.id;
        AlertService.show(ALERT_CODES.success, "Successfully registered/updated animal with Id "
            + animal.id + ".");
        NavService.goTo(NAV_PATHS.animalList);
      }, function errorCallback(error) {
        $scope.stopLoading();
        AlertService.show(ALERT_CODES.error, "Error saving animal.");
      });
    } else {
      AlertService.show(ALERT_CODES.warning, "Please resolve the highlighted errors.");
    }
  };

  /**
   * List animals
   */
  $scope.listAnimals = function() {
    $scope.startLoading();
    AnimalService.list().then(function(o) {
      $scope.stopLoading();
      $scope.animalList = o;
    }, function(error) {
      $scope.stopLoading();
      AlertService.show(ALERT_CODES.error, "Error retrieving animals.");
    });
  };

  /**
   * Retrieve one animal
   */
  $scope.animalDetail = function() {
    if ($routeParams != undefined && $routeParams.animalId != undefined) {
      $scope.startLoading();
      AnimalService.animalDetail($routeParams.animalId).get().then(function(object) {
        $scope.stopLoading();
        $scope.animal = object.originalData;
      }, function(error) {
        $scope.stopLoading();
        AlertService.show(ALERT_CODES.error, "Error retrieving animal with Id " + animalId + ".");
      });
    }
  };

  /**
   * Delete one animal
   */
  $scope.deleteAnimal = function(animal) {
    if (animal != undefined && animal.id != undefined) {
      $scope.startLoading();
      AnimalService.deleteAnimal(animal.id).then(
          function(object) {
            $scope.stopLoading();
            $scope.animal = {};
            AlertService.show(ALERT_CODES.info, "Successfully deleted animal with Id " + animal.id
                + ".");
            NavService.goTo(NAV_PATHS.animalList);
          },
          function(error) {
            $scope.stopLoading();
            AlertService
                .show(ALERT_CODES.error, "Error deleting animal with Id " + animal.id + ".");
            NavService.goTo(NAV_PATHS.animalList);
          });
    }
  };

  $scope.isNew = function(animal) {
    return animal == undefined || animal.id == undefined;
  };
});