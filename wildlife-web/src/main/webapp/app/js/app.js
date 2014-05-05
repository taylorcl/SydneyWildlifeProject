'use strict';

var sydneyWildlifeApp = angular.module('sydneyWildlifeApp', ['ngRoute', 'ngAnimate', 'restangular', 'ui.bootstrap'])
         .config(function ($routeProvider, RestangularProvider, $locationProvider, USER_ROLES) {
					
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
					
					$routeProvider.when('/login',
                     {
                         templateUrl: 'views/Login.html',
                         controller: 'LoginController',
                         activePage: 'login',
                         authorization: [] /* no restriction */
                     });
					$routeProvider.when('/members',
	                    {
	                        templateUrl: 'views/MemberList.html',
	                        controller: 'MemberController',
	                        activePage: 'members',
	                        authorization: [USER_ROLES.all]
	                    });
					$routeProvider.when('/members/new',
				        {
				            templateUrl:'views/Member.html',
				            controller: 'MemberController',
				            activePage: 'members',
				            authorization: [USER_ROLES.admin, USER_ROLES.editor]
				        });
				    $routeProvider.when('/members/:memberId',
				        {
				            templateUrl: 'views/Member.html',
				            controller: 'MemberController',
				            activePage: 'members',
				            authorization: [USER_ROLES.admin, USER_ROLES.editor]
				        });
				    $routeProvider.when('/animals',
                      {
                          templateUrl: 'views/AnimalList.html',
                          controller: 'AnimalController',
                          activePage: 'animals',
                          authorization: [USER_ROLES.all]
                      });
              $routeProvider.when('/animals/new',
                   {
                       templateUrl:'views/Animal.html',
                       controller: 'AnimalController',
                       activePage: 'animals',
                       authorization: [USER_ROLES.admin, USER_ROLES.editor]
                   });
               $routeProvider.when('/animals/:animalId',
                   {
                       templateUrl: 'views/Animal.html',
                       controller: 'AnimalController',
                       activePage: 'animals',
                       authorization: [USER_ROLES.admin, USER_ROLES.editor]
                   }); 
				    $routeProvider.otherwise({redirectTo: '/animals'});
         });

sydneyWildlifeApp.run(function ($rootScope, AUTH_EVENTS, AuthService) {
            $rootScope.$on('$routeChangeStart', function (event, next, prev) {
              var authorizedRoles = next.authorization;
              if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                  // user is not allowed
//                   AuthService.fireEvent(AUTH_EVENTS.notAuthorized, "");
                  $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, {
                        msg: "Sorry, you're not authorized to access the page you're trying to reach.",
                        prevPath: (prev!= undefined) ? prev.originalPath : undefined,
                        nextPath: next.originalPath
                     });
                } else {
                  // user is not logged in
//                   AuthService.fireEvent(AUTH_EVENTS.notAuthenticated, "");
                  $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, {
                     msg: "Please login first.",
                     prevPath: (prev!= undefined) ? prev.originalPath : undefined,
                     nextPath: next.originalPath
                  });
                }
              }
            });
          });