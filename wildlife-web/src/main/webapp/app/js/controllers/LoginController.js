'use strict';

/*
 * Login functionalities for the controller layer
 */
sydneyWildlifeApp.controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
   $scope.credentials = {
         username: '',
         password: ''
   };
   $scope.login = function (credentials) {
      $scope.startLoading();
      //To be uncommented when a backend is here for authentication
//     AuthService.login(credentials).then(function () {
//        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//     }, function () {
//        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
//     });
      var user = AuthService.login(credentials);
      $scope.stopLoading();
      if(user == null) {
         $rootScope.$broadcast(AUTH_EVENTS.loginFailed, {
               msg: "Unable to log in."
            });
      } else {
         $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {
            user: user,
            msg: "Logged in successfully."
         });
      }
   };
});