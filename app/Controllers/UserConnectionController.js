app.controller('UserConnectionController', ['$scope', '$window', 'UserFactory', 'WorldFactory', function($scope, $window, UserFactory, WorldFactory) {

	$scope.worlds = [];
	$scope.worldSpinner = true;

	WorldFactory.getWorlds().then(function(response) {
		$scope.worlds = response.data;
		$scope.worldSpinner = false;
	}, function(errorMessage) {
		console.log('error: ', errorMessage);
	});

	$scope.doLogin = function() {

		var world = $scope.world,
			email = $scope.email,
			password = $scope.password;
		var params = {world: world, login: email, password: password};

		console.log('paramètres : %o', params);

		UserFactory.connection(params).then(
			function(response) {
				console.log(response);
				if (response.data) {
					sessionStorage.setItem('player', JSON.stringify(response.data));
					$window.location.href = '#/map';
				}
			}, function(errorMessage) {
				console.log(errorMessage);
			}
		);
	}

	$scope.doSignin = function() {
		$window.location.href = '#/signin';
	}

}]);
