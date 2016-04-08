app.controller('UserSigninController', ['$scope', '$window', 'UserFactory', function($scope, $window, UserFactory) {

	$scope.doSignin = function() {

		var email = $scope.email,
			pseudo = $scope.pseudo,
			password = $scope.password,
			passwordcontrol = $scope.passwordcontrol;
		var hashpassword = password;
		var params = {email: email, login: email, pseudo: pseudo, password: hashpassword};


		console.log('paramètres : %o', params);

		UserFactory.create(params).then(
			function(response) {
				console.log(response);
			}, function(errorMessage) {
				console.log(errorMessage);
			}
		);

	}

	$scope.doBack = function() {
		$window.location.href = '#/home';
	}

}]);
