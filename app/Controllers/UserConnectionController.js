app.controller('UserConnectionController', ['$scope', '$window', function($scope, $window) {

	$scope.login = function() {

	}

	$scope.signin = function() {
		$window.location.href = '#/signin';
	}

}]);
