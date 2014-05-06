'use strict';

/*
 * Global functionalities for the controller layer
 */
sydneyWildlifeApp.controller('AppController', function ($scope, USER_ROLES, AUTH_EVENTS, ALERT_CODES, AuthService, NavService, AlertService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  //default path
  $scope.nextPath = "/animals";
  
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
  
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event, args) {
     AlertService.show(ALERT_CODES.warning, args.msg);
     NavService.goTo("/login");
     $scope.nextPath = args.nextPath;
  });
  
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event, args) {
     AlertService.show(ALERT_CODES.warning, args.msg);
     NavService.goTo((args.prevPath != undefined) ? args.prevPath : "/login");
  });
  
  $scope.$on(AUTH_EVENTS.loginSuccess, function(event, args) {
     $scope.currentUser = args.user;
     AlertService.show(ALERT_CODES.success, args.msg);
     NavService.goTo($scope.nextPath);
  });
  
  $scope.$on(AUTH_EVENTS.loginFailed, function(event, args) {
     AlertService.show(ALERT_CODES.error, args.msg);
     NavService.goTo("/login");
  });
  
  $scope.$on(AUTH_EVENTS.logoutSuccess, function(event, args) {
     AlertService.show(ALERT_CODES.success, args.msg);
     NavService.goTo("/login");
  });
  
  $scope.$on(AUTH_EVENTS.sessionTimeout, function(event, args) {
     AlertService.show(ALERT_CODES.error, args.msg);
     NavService.goTo("/login");
  });
});