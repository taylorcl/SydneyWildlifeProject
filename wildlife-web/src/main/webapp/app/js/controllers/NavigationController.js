'use strict';

/*
 * Navigation functionalities for the controller layer
 */
sydneyWildlifeApp.controller('NavController',
    function NavController($scope, $route, $location) {
       //we set $route to  we have access to it in the HTML
       $scope.$route = $route;
       
       $scope.$on("goToEvent", function (event, args) {
          $location.path(args.route);
       });
    }


);
