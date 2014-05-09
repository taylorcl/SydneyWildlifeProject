'use strict';

/*
 * Alert functionalities for the controller layer
 */
sydneyWildlifeApp.controller('AlertController', function AlertController($scope, $rootScope,
    AlertService) {
  $scope.alerts = $rootScope.alerts;

  $scope.close = function(index) {
    AlertService.close(index);
  };

  $scope.closeable = function() {
    return true;
  };
});
