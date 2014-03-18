'use strict';

sydneyWildlifeApp.directive('datePicker',[  function () {
    return  function (scope, element) {
    		element.datepicker();
    		
    		//Since a silent assignment will not cause scope.$apply() to be called
    		//we have to tickle the scope explicitly.
    		element.on("change", function() {
    			scope.user.visitDate = element.val();
    			scope.userForm.$valid = true;
    		});

    	}
}]);
 
