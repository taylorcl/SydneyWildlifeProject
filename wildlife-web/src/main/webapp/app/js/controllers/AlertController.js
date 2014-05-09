'use strict';

/*
 * Alert functionalities for the controller layer
 */
sydneyWildlifeApp.controller('AlertController', function AlertController($scope, $rootScope,
    NotifService) {
  $scope.alerts = $rootScope.alerts;

  $scope.close = function(index) {
    NotifService.closeAlert(index);
  };

  $scope.closeable = function() {
    return true;
  };
});
