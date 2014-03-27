'use strict';

/*
 * Alert functionalities for the service layer
 */
sydneyWildlifeApp.factory('AlertService', ['$rootScope', function ($rootScope) {
	
   var alertService = {};

   // create an array of alerts available globally
   $rootScope.alerts = [];

   alertService.show = function(type, msg) {
      $rootScope.alerts.push({'type': type, 'msg': msg});
   };

   alertService.close = function(index) {
      $rootScope.alerts.splice(index, 1);
   };

   return alertService;
}]);
