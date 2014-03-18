'use strict';

var sydneyWildlifeApp = angular.module('sydneyWildlifeApp', ['restangular', 'ui.bootstrap'])
				.config(function ($routeProvider, RestangularProvider, $locationProvider) {
					
					// TODO: we need to derive this
					RestangularProvider.setBaseUrl('http://localhost:8080/wildlife-api/api');
					
					RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
					  var newResponse = response.payload;
					  if (angular.isArray(newResponse)) {
						    angular.forEach(newResponse, function(value, key) {
						    	if (newResponse[key] != undefined){
						    		newResponse[key].originalElement = angular.copy(value);
						    	}
						    });
					  } else {
						  if (newResponse != undefined) {
							  newResponse.originalElement = angular.copy(newResponse);
					  	  }
					  }						
					  return newResponse;
					  
				    });
				    
					$routeProvider.when('/registerUser',
				        {
				            templateUrl:'views/User.html',
				            controller: 'UserController'
				        });
				    $routeProvider.when('/members',
				        {
				            templateUrl: 'views/UserList.html',
				            controller: 'UserController'
				        });
				    $routeProvider.when('/userDetail/:userId',
				        {
				            templateUrl: 'views/User.html',
				            controller: 'UserController'
				        });						    
				    $routeProvider.when('/pointyPieChart',
				        {
				            templateUrl: 'views/PieChart.html',
				            controller: 'PieChartController'
				        });				    
				    $routeProvider.when('/pointyBarChart',
				        {
				            templateUrl: 'views/BarChart.html',
				            controller: 'BarChartController'
				        });	
				    $routeProvider.otherwise({redirectTo: '/registerUser'});
				    //$locationProvider.html5Mode(true);
});