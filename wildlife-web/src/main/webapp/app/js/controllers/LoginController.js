'use strict';

/*
 * Login functionalities for the controller layer
 */
sydneyWildlifeApp.controller('LoginController', function($scope, $rootScope, AUTH_EVENTS,
    LOAD_TYPES, AuthService, NotifService) {

  $scope.credentials = {
    username : '',
    password : ''
  };

  $scope.login = function(credentials) {
    NotifService.load(LOAD_TYPES.start);
    // To be uncommented when a backend is here for authentication
    // AuthService.login(credentials).then(function () {
    // $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    // }, function () {
    // $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    // });
    var user = AuthService.login(credentials);
    NotifService.load(LOAD_TYPES.stop);
    if (user == null) {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed, {
        msg : "Unable to log in."
      });
    } else {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {
        user : user,
        msg : "User " + user.userName + " logged in successfully."
      });
    }
  };
});