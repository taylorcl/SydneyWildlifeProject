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
				            return newResponse;
						}
						return response;
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
				    $routeProvider.otherwise({redirectTo: '/members'});
				    //$locationProvider.html5Mode(true);
});