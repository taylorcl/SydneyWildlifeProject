'use strict';

/*
 * Navigation functionalities for the service layer
 */
sydneyWildlifeApp.factory('NavService', function($location) {
  var navService = {};

  navService.goTo = function(route) {
    $location.path(route);
  };

  return navService;
});
