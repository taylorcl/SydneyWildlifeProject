'use strict';

/*
 * Navigation functionalities for the controller layer
 */
sydneyWildlifeApp.controller('NavController',
    function NavController($scope, $route) {
       //we set $route to  we have access to it in the HTML
       $scope.$route = $route;
    }

);
