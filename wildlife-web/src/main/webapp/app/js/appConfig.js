'use strict';

sydneyWildlifeApp.config(function ($routeProvider, RestangularProvider, $locationProvider, USER_ROLES, NAV_PATHS) {
					
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
					
					$routeProvider.when(NAV_PATHS.login,
                     {
                         templateUrl: 'views/Login.html',
                         controller: 'LoginController',
                         activePage: 'login',
                         authorization: [] /* no restriction */
                     });
					$routeProvider.when(NAV_PATHS.memberList,
	                    {
	                        templateUrl: 'views/MemberList.html',
	                        controller: 'MemberController',
	                        activePage: 'members',
	                        authorization: [USER_ROLES.admin]
	                    });
					$routeProvider.when(NAV_PATHS.memberNew,
				        {
				            templateUrl:'views/Member.html',
				            controller: 'MemberController',
				            activePage: 'members',
				            authorization: [USER_ROLES.admin]
				        });
				    $routeProvider.when(NAV_PATHS.memberEdit,
				        {
				            templateUrl: 'views/Member.html',
				            controller: 'MemberController',
				            activePage: 'members',
				            authorization: [USER_ROLES.admin, USER_ROLES.member]
				        });
				    $routeProvider.when(NAV_PATHS.animalList,
                      {
                          templateUrl: 'views/AnimalList.html',
                          controller: 'AnimalController',
                          activePage: 'animals',
                          authorization: [USER_ROLES.all]
                      });
              $routeProvider.when(NAV_PATHS.animalNew,
                   {
                       templateUrl:'views/Animal.html',
                       controller: 'AnimalController',
                       activePage: 'animals',
                       authorization: [USER_ROLES.admin, USER_ROLES.member]
                   });
               $routeProvider.when(NAV_PATHS.animalEdit,
                   {
                       templateUrl: 'views/Animal.html',
                       controller: 'AnimalController',
                       activePage: 'animals',
                       authorization: [USER_ROLES.admin, USER_ROLES.member]
                   }); 
				    $routeProvider.otherwise({redirectTo: NAV_PATHS.home});
         });

sydneyWildlifeApp.run(function ($rootScope, AUTH_EVENTS, AuthService) {
            $rootScope.$on('$routeChangeStart', function (event, next, prev) {
              var authorizedRoles = next.authorization;
              if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                  // user is not allowed
                  $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, {
                        msg: "Sorry, you're not authorized to access the page you're trying to reach.",
                        prevPath: (prev!= undefined) ? prev.originalPath : undefined,
                        nextPath: next.originalPath
                     });
                } else {
                  // user is not logged in
                  $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, {
                     msg: "Please login first.",
                     prevPath: (prev!= undefined) ? prev.originalPath : undefined,
                     nextPath: next.originalPath
                  });
                }
              }
            });
          });