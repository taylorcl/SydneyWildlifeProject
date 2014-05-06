'use strict';

/*
 * Authentication constants shared across all layers
 */
sydneyWildlifeApp.constant('AUTH_EVENTS', {
   loginSuccess: 'auth-login-success',
   loginFailed: 'auth-login-failed',
   logoutSuccess: 'auth-logout-success',
   sessionTimeout: 'auth-session-timeout',
   notAuthenticated: 'auth-not-authenticated',
   notAuthorized: 'auth-not-authorized'
});

sydneyWildlifeApp.constant('USER_ROLES', {
   all: '*',
   admin: 'admin',
   member: 'member'
});