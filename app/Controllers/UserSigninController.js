app.controller('UserSigninController', ['$scope', '$window', 'UserFactory', function($scope, $window, UserFactory) {

	$scope.back = function() {
		$window.location.href = '#/home';
	}

	$scope.signin = function() {

	}

}]);
