'use strict';

/*
 * Alert functionalities for the service layer
 */
sydneyWildlifeApp.factory('AlertService', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
	
   var alertService = {};

   // create an array of alerts available globally
   $rootScope.alerts = [];

   alertService.show = function(type, msg) {
      $rootScope.alerts.push({'type': type, 'msg': msg});
      // automatically clear alert message after 3secs
      $timeout(function() {alertService.close($rootScope.alerts.length-1);}, 3000);
   };

   alertService.close = function(index) {
      $rootScope.alerts.splice(index, 1);
   };

   return alertService;
}]);
