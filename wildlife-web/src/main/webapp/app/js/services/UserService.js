'use strict';

sydneyWildlifeApp.factory('UserService',['Restangular', 'DateService', function (Restangular, DateService) {
	
	/**
	 * Local method to massage the date if needed.
	 */
	function massageDate(aDate){
		return DateService.convertJSONToMMDDYYYYDate(aDate);
	};

    return {
        save: function(user) {
        	var baseUsers = Restangular.all("users");
        	var originalDate = user.visitDate;
        	user.visitDate = DateService.convertMMDDYYYYToJSONDate(originalDate);
        	
        	var aPromise = baseUsers.post(user);
        	user.visitDate = originalDate;
        	return aPromise;

        },
        list: function() {
        	var baseUsers = Restangular.all("members");
        	
        	var aPromise = baseUsers.getList().then(function(object){
        		for (var i = 0; i < object.length; i++){
        			var user = object[i];
        			var readableDate = massageDate(user.visitDate);	
        			user.visitDate = readableDate;
        		}
        		return object;
        	});
        	return aPromise;
        },
        userDetail: function(id){
        	return Restangular.one("users", id);
        	
        },
        deleteUser: function(id){
        	return Restangular.one("users", id).remove();
        }
    };
}]);
