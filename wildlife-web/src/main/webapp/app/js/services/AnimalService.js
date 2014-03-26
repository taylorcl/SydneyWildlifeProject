'use strict';

sydneyWildlifeApp.factory('AnimalService',['Restangular', 'DateService', function (Restangular, DateService) {
	
	/**
	 * Local method to massage the date if needed.
	 */
	function massageDate(aDate){
		return DateService.convertJSONToMMDDYYYYDate(aDate);
	};

    return {
        save: function(animal) {
        	var baseAnimals = Restangular.all("animals");
        	
        	var aPromise = baseAnimals.post(animal);
        	return aPromise;
        },
        list: function() {
        	var baseAnimals = Restangular.all("animals");
        	
        	var aPromise = baseAnimals.getList();
        	return aPromise;
        },
        animalDetail: function(id){
        	return Restangular.one("animals", id);
        	
        },
        deleteAnimal: function(id){
        	return Restangular.one("animals", id).remove();
        }
    };
}]);
