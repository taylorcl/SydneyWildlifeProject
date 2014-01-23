'use strict';
/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Sydney Wildlife App E-2-E Tests', function() {
	
	var rootContext = '../../app/index.html';
	var FIRST = "Steely";
	var LAST = "Dan";
	var SOME_DATE = '03/04/2000';

	describe('Sydney Wildlife App', function() {
		
		it('Should save a user', function() {
	      browser().navigateTo(rootContext);
	      
		  input('user.firstName').enter(FIRST);
		  input('user.lastName').enter(LAST);
		  input('user.visitDate').enter(SOME_DATE);
		  //pause();
		  element('#save-user-button').click();
		  expect(element('.ng-scope.ng-binding').text()).toBe("User registered successfully! Just went over to sydwildlife-api webapp using Restangular and saved this user!");
		});
		
		//Learn JQuery!
		xit('Should list the user', function() {
		      browser().navigateTo(rootContext + "#/users");
		      
			  //pause();
			  //expect(element('table tr:last children().eq(1)').text()).toBe("User registered successfully!");
		});
		
		xit('Should delete a user', function() {
		      browser().navigateTo(rootContext);
		      
			  input('user.firstName').enter(FIRST);
			  input('user.lastName').enter(LAST);
			  input('user.visitDate').enter(SOME_DATE);
			  //pause();
			  element('#save-user-button').click();
			  expect(element('.ng-scope.ng-binding').text()).toBe("User registered successfully!");
			});
	});	
});
