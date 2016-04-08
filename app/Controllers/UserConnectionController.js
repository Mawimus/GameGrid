app.controller('UserConnectionController', ['$scope', '$window', 'UserFactory', function($scope, $window, UserFactory) {

	$scope.doLogin = function() {

		var email = $scope.email,
			password = $scope.password;
		var params = {login: email, password: password};

		console.log('paramètres : %o', params);

		UserFactory.connection(params).then(
			function(response) {
				console.log(response);
			}, function(errorMessage) {
				console.log(errorMessage);
			}
		);
	}

	$scope.doSignin = function() {
		$window.location.href = '#/signin';
	}

}]);
