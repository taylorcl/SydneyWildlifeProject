'use strict';

/*
 * Global functionalities for the controller layer
 */
sydneyWildlifeApp.controller('AppController', function($scope, $rootScope, USER_ROLES, AUTH_EVENTS,
    ALERT_TYPES, LOG_TYPES, NAV_PATHS, AuthService, NavService, NotifService) {

  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.nextPath = NAV_PATHS.home;

  $scope.isLoading = function() {
    return $rootScope.loading;
  };

  $scope.isAuthorized = function(roles) {
    return AuthService.isAuthorized(roles);
  };

  $scope.getCurrentUserRole = function() {
    return ($scope.currentUser != null) ? $scope.currentUser.userRole : undefined;
  };

  $scope.logout = function() {
    $scope.currentUser = AuthService.logout();
    $scope.$broadcast(AUTH_EVENTS.logoutSuccess, {
      msg : "Logged out successfully."
    });
  };

  // -------------------- Catching AUTHENTICATION EVENTS ---------------------

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event, args) {
    NotifService.alert(ALERT_TYPES.warning, args.msg);
    NotifService.log(LOG_TYPES.warning, args.msg);
    NavService.goTo(NAV_PATHS.login);
    $scope.nextPath = args.nextPath;
  });

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event, args) {
    var msg = args.msg;
    var nextPath = args.prevPath;
    if (args.prevPath != undefined) {
      if (args.prevPath === NAV_PATHS.login) {
        nextPath = NAV_PATHS.home;
        msg += " Redirecting you to the default page.";
      }
    } else {
      nextPath = NAV_PATHS.login;
      msg += " Redirecting you to the login page.";
    }
    NotifService.alert(ALERT_TYPES.warning, msg);
    NotifService.log(LOG_TYPES.warning, msg);
    NavService.goTo(nextPath);
  });

  $scope.$on(AUTH_EVENTS.loginSuccess, function(event, args) {
    $scope.currentUser = args.user;
    NotifService.log(LOG_TYPES.info, args.msg);
    NavService.goTo($scope.nextPath);
  });

  $scope.$on(AUTH_EVENTS.loginFailed, function(event, args) {
    NotifService.alert(ALERT_TYPES.error, args.msg);
    NotifService.log(LOG_TYPES.error, args.msg);
    NavService.goTo(NAV_PATHS.login);
  });

  $scope.$on(AUTH_EVENTS.logoutSuccess, function(event, args) {
    NotifService.log(LOG_TYPES.info, args.msg);
    NavService.goTo(NAV_PATHS.login);
  });

  $scope.$on(AUTH_EVENTS.sessionTimeout, function(event, args) {
    NotifService.log(LOG_TYPES.warning, args.msg);
    NavService.goTo(NAV_PATHS.login);
  });
});