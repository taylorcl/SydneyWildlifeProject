'use strict';

/*
 * Navigation functionalities for the controller layer
 */
sydneyWildlifeApp.controller('NavController',
    function NavController($scope, $route) {
   
       $scope.isActive = function(routeId) {
          var activePage = false;
          
          if($route.current != undefined) {
             activePage = $route.current.activePage;
          }
          
          return activePage === routeId;
       };
    }

);
