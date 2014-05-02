'use strict';

/*
 * Authentication functionalities for the service layer
 */
sydneyWildlifeApp.factory('AuthService', function ($http, Session, USER_ROLES) {
   return {
      login: function(credentials) {
       //To be uncommented when a backend is here for authentication
//        return $http
//          .post('/login', credentials)
//          .then(function (res) {
//            Session.create(res.id, res.userid, res.role);
//          });
         return Session.create("000001", "123456", "editor");
      },
      logout: function() {
         return Session.destroy();
      },
      isAuthenticated: function() {
        return !!Session.userId;
      },
      isAuthorized: function(authorizedRoles) {
        if(authorizedRoles == undefined || authorizedRoles.length === 0) {
           return true;
        } else {
        return (this.isAuthenticated() &&
          (authorizedRoles.indexOf(Session.userRole) !== -1 || authorizedRoles.indexOf(USER_ROLES.all) !== -1));
        }
      }
    };
});

sydneyWildlifeApp.service('Session', function () {
   this.create = function (sessionId, userId, userRole) {
     this.id = sessionId;
     this.userId = userId;
     this.userRole = userRole;
     
     return this;
   };
   this.destroy = function () {
     this.id = null;
     this.userId = null;
     this.userRole = null;
     
     return this;
   };
   return this;
});