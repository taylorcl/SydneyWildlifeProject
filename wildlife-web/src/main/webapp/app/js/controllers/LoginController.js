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
      //To be uncommented when a backend is here for authentication
//     AuthService.login(credentials).then(function () {
//        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//     }, function () {
//        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
//     });
      var user = AuthService.login(credentials);
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {
               user: user,
               msg: "Logged in successfully."
            });
   };
});