'use strict';

var sydneyWildlifeApp = angular.module('sydneyWildlifeApp', ['ngRoute', 'restangular', 'ui.bootstrap'])
				.config(function ($routeProvider, RestangularProvider, $locationProvider) {
					
					// TODO: we need to derive this
					RestangularProvider.setBaseUrl('http://localhost:8080/wildlife-api/api');
					
					RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred){
						if (operation === 'getList') {
					        var newResponse = response.data.content;
				            newResponse._resultmeta = {
				                "count": response.count,
				                "next": response.next,
				                "previous": response.previous
				            };
				            angular.forEach(newResponse, function(value, key) {
		                       if (newResponse[key] != undefined){
		                          newResponse[key].originalData = angular.copy(value);
		                       }
		                     });
				            return newResponse;
						}
						
						var newResponse = response.data;
                  if (newResponse != undefined) {
                     newResponse.originalData = angular.copy(newResponse);
                  }
                
						return newResponse;
					});
					
					$routeProvider.when('/members',
	                    {
	                        templateUrl: 'views/MemberList.html',
	                        controller: 'MemberController',
	                        activePage: 'members'
	                    });
					$routeProvider.when('/members/new',
				        {
				            templateUrl:'views/Member.html',
				            controller: 'MemberController',
				            activePage: 'members'
				        });
				    $routeProvider.when('/members/:memberId',
				        {
				            templateUrl: 'views/Member.html',
				            controller: 'MemberController',
				            activePage: 'members'
				        });						    
				    $routeProvider.otherwise({redirectTo: '/members'});
				    //$locationProvider.html5Mode(true);
});