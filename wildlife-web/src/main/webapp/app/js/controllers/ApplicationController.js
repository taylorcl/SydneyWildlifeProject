'use strict';

/*
 * Global functionalities for the controller layer
 */
sydneyWildlifeApp.controller('AppController', function ($scope, USER_ROLES, AUTH_EVENTS, ALERT_CODES, NAV_PATHS, AuthService, NavService, AlertService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.nextPath = NAV_PATHS.home;
  $scope.loading = false;
  
  $scope.isLoading = function() {
    return $scope.loading; 
  };
  
  $scope.startLoading = function() {
     $scope.loading = true; 
  };
  
  $scope.stopLoading = function() {
     $scope.loading = false; 
  };
  
  $scope.isAuthorized = function (roles) {
     return AuthService.isAuthorized(roles);
  };
  
  $scope.getCurrentUserRole = function () {
     return ($scope.currentUser != null) ? $scope.currentUser.userRole : undefined;
  };
  
  $scope.logout = function () {
     $scope.currentUser = AuthService.logout();
     $scope.$broadcast(AUTH_EVENTS.logoutSuccess, {
        msg: "Logged out successfully."
     });
  };
  
  // ---------------------------- Catching AUTHENTICATION EVENTS -----------------------------
  
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event, args) {
     AlertService.show(ALERT_CODES.warning, args.msg);
     NavService.goTo(NAV_PATHS.login);
     $scope.nextPath = args.nextPath;
  });
  
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event, args) {
     var msg = args.msg;
     var nextPath = args.prevPath;
     if(args.prevPath != undefined) {
        if(args.prevPath === NAV_PATHS.login) {
           nextPath = NAV_PATHS.home;
           msg += " Redirecting you to the default page.";
        } 
     } else {
        nextPath = NAV_PATHS.login;
        msg += " Redirecting you to the login page.";
     }
     AlertService.show(ALERT_CODES.warning, msg);
     NavService.goTo(nextPath);
  });
  
  $scope.$on(AUTH_EVENTS.loginSuccess, function(event, args) {
     $scope.currentUser = args.user;
     // AlertService.show(ALERT_CODES.success, args.msg);
     NavService.goTo($scope.nextPath);
  });
  
  $scope.$on(AUTH_EVENTS.loginFailed, function(event, args) {
     AlertService.show(ALERT_CODES.error, args.msg);
     NavService.goTo(NAV_PATHS.login);
  });
  
  $scope.$on(AUTH_EVENTS.logoutSuccess, function(event, args) {
     // AlertService.show(ALERT_CODES.success, args.msg);
     NavService.goTo(NAV_PATHS.login);
  });
  
  $scope.$on(AUTH_EVENTS.sessionTimeout, function(event, args) {
     AlertService.show(ALERT_CODES.error, args.msg);
     NavService.goTo(NAV_PATHS.login);
  });
});