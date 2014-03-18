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
				    
					$routeProvider.when('/registerMember',
				        {
				            templateUrl:'views/Member.html',
				            controller: 'MemberController'
				        });
				    $routeProvider.when('/members',
				        {
				            templateUrl: 'views/MemberList.html',
				            controller: 'MemberController'
				        });
				    $routeProvider.when('/memberDetail/:memberId',
				        {
				            templateUrl: 'views/Member.html',
				            controller: 'MemberController'
				        });						    
				    $routeProvider.otherwise({redirectTo: '/registerMember'});
				    //$locationProvider.html5Mode(true);
});