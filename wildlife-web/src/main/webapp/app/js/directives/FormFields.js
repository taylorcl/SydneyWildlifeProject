'use strict';

/*
 * Directives for common fields used in forms
 */
sydneyWildlifeApp.directive('swAddress', [ function () {
   return {
      restrict: 'E',
      scope: {
         id: '@addrId',
         label: '@addrLabel',
         required: '=addrRequired',
         model: '=addrModel'
      },
      templateUrl: 'partials/FormAddress.html',
      controller: function ($scope, $attrs, POSTAL_STATES) {
         $scope.postalStates = POSTAL_STATES;
     }
  };
}]);