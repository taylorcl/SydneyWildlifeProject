'use strict';

/*
 * Alert functionalities for the service layer
 */
sydneyWildlifeApp.factory('NotifService', [ '$rootScope', '$timeout', '$log', 'LOAD_TYPES',
    'LOG_TYPES', function($rootScope, $timeout, $log, LOAD_TYPES, LOG_TYPES) {

      var notifService = {};

      // create an array of alerts available globally
      $rootScope.alerts = [];
      $rootScope.loading = false;

      notifService.alert = function(type, msg) {
        $rootScope.alerts.push({
          'type' : type,
          'msg' : msg
        });
        // automatically clear alert message after 3secs
        $timeout(function() {
          notifService.closeAlert(0);
        }, 3000);
      };

      notifService.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
      };

      notifService.load = function(type) {
        if (type === LOAD_TYPES.start) {
          $rootScope.loading = true;
        } else {
          $rootScope.loading = false;
        }
      };

      notifService.log = function(type, msg) {
        switch (type) {
        case LOG_TYPES.debug:
          $log.debug(msg);
          break;
        case LOG_TYPES.info:
          $log.info(msg);
          break;
        case LOG_TYPES.warning:
          $log.warn(msg);
          break;
        case LOG_TYPES.error:
          $log.error(msg);
          break;
        default:
          $log.log(msg);
          break;
        }
      };

      return notifService;
    } ]);
