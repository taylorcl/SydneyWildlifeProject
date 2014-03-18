'use strict';

sydneyWildlifeApp.factory('MemberService',['Restangular', 'DateService', function (Restangular, DateService) {
	
	/**
	 * Local method to massage the date if needed.
	 */
	function massageDate(aDate){
		return DateService.convertJSONToMMDDYYYYDate(aDate);
	};

    return {
        save: function(member) {
        	var baseMembers = Restangular.all("members");
        	var originalDate = member.visitDate;
        	member.visitDate = DateService.convertMMDDYYYYToJSONDate(originalDate);
        	
        	var aPromise = baseMembers.post(member);
        	member.visitDate = originalDate;
        	return aPromise;

        },
        list: function() {
        	var baseMembers = Restangular.all("members");
        	
        	var aPromise = baseMembers.getList().then(function(object){
        		for (var i = 0; i < object.length; i++){
        			var member = object[i];
        			var readableDate = massageDate(member.visitDate);	
        			member.visitDate = readableDate;
        		}
        		return object;
        	});
        	return aPromise;
        },
        memberDetail: function(id){
        	return Restangular.one("members", id);
        	
        },
        deleteMember: function(id){
        	return Restangular.one("members", id).remove();
        }
    };
}]);
