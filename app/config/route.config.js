
// http://www.tutoriel-angularjs.fr/tutoriel/2-utilisation-complete-d-angularjs/1-le-routage
app.config(['$routeProvider', function($routeProvider) {

	$routeProvider
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'UserConnectionController'
		})
		.when('/signin', {
			templateUrl: 'views/signin.html',
			controller: 'UserSigninController'
		})
		.when('/map', {
			templateUrl: 'views/map.html',
			controller: 'SquareGridController'
		})
		.otherwise({redirectTo: '/home'});

}]);
