app.controller('UserSigninController', ['$scope', '$window', 'UserFactory', 'WorldFactory', function($scope, $window, UserFactory, WorldFactory) {

	$scope.worlds = [];
	$scope.worldSpinner = true;

	WorldFactory.getWorlds().then(function(response) {
		$scope.worlds = response.data;
		$scope.worldSpinner = false;
	}, function(errorMessage) {
		console.log('error: ', errorMessage);
	});


	$scope.doSignin = function() {

		var world = $scope.world,
			email = $scope.email,
			pseudo = $scope.pseudo,
			password = $scope.password,
			passwordControl = $scope.passwordControl,
			hashpassword = password,
			params = {world: world, email: email, login: email, pseudo: pseudo, password: hashpassword};

		console.log('paramètres : %o', params);

		/* Control sur le monde */
		if ($scope.signinform.world.$invalid) {
			$scope.worldClass = 'has-error';
			$scope.worldError = true;
			if ($scope.signinform.world.$error.required) $scope.worldErrorMsg = 'Le monde est obligatoire';
		} else {
			$scope.worldClass = '';
			$scope.worldError = false;
			$scope.worldErrorMsg = '';
		}

		/* Control sur l'email */
		if ($scope.signinform.email.$invalid) {
			$scope.emailClass = 'has-error';
			$scope.emailError = true;
			if ($scope.signinform.email.$error.required) $scope.emailErrorMsg = 'L\'email est obligatoire';
			if ($scope.signinform.email.$error.email) $scope.emailErrorMsg = 'L\'email n\'est pas correctement formaté';
		} else {
			$scope.emailClass = '';
			$scope.emailError = false;
			$scope.emailErrorMsg = '';
		}

		/* Control sur le pseudo */
		if ($scope.signinform.pseudo.$invalid) {
			$scope.pseudoClass = 'has-error';
			$scope.pseudoError = true;
			if ($scope.signinform.pseudo.$error.required) $scope.pseudoErrorMsg = 'Le pseudo est obligatoire';
		} else {
			$scope.pseudoClass = '';
			$scope.pseudoError = false;
			$scope.pseudoErrorMsg = '';
		}

		/* Control sur le mot de passe */
		if ($scope.signinform.password.$invalid) {
			$scope.passwordClass = 'has-error';
			$scope.passwordError = true;
			if ($scope.signinform.password.$error.required) $scope.passwordErrorMsg = 'Le mot de passe est obligatoire';
		} else {
			$scope.passwordClass = '';
			$scope.passwordError = false;
			$scope.passwordErrorMsg = '';
		}

		if ($scope.signinform.confirmpassword.$invalid) {
			$scope.confirmPasswordClass = 'has-error';
			$scope.confirmPasswordError = true;
			$scope.confirmPasswordErrorMsg = $scope.signinform.confirmpassword.$error;
			if ($scope.signinform.confirmpassword.$error.required) $scope.confirmPasswordErrorMsg =  'Le mot de passe est obligatoire';
			if ($scope.signinform.confirmpassword.$error.match) $scope.confirmPasswordErrorMsg =  'Le mot de passe ne correspond pas';
		} else {
			$scope.confirmPasswordClass = '';
			$scope.confirmPasswordError = false;
			$scope.confirmPasswordErrorMsg = '';
		}

		if (!$scope.signinform.confirmpassword.$invalid) {
			UserFactory.create(params).then(
				function(response) {
					console.log('success: ', response);
					// Redirection vers la page de configuration du compte (le clan)
					// (Sélection du pays...)
					$window.location.href = '#/clan-configuration';
				}, function(errorMessage) {
					console.log('error: ', errorMessage);
				}
			);
		}

	}

	$scope.doBack = function() {
		$window.location.href = '#/home';
	}

}]);
