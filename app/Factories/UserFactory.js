app.factory('UserFactory', ['$http', '$q', '$resource', 'apiBaseUrl', function($http, $q, $resource, apiBaseUrl) {

	return ({
		connection: connection,
		create: create
	});

	function connection(params) {
		var request =  $http({
			method: 'POST',
			url: apiBaseUrl + 'user/connect/' + params.world._id,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			data: {login: params.login, password: params.password}
		});

		return request;
	}

	function create(params) {
		var request = $http({
			method: 'POST',
			url: apiBaseUrl + 'user/' + params.world._id,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			data: {email: params.email, login: params.login, pseudo: params.pseudo, password: params.password}
		});

		return request;
	}

	// function handleSuccess(response) {
	// 	if(!angular.isObject(response.data) || !reponse.data.message) {
	// 		return($q.reject('An unknow error occurred.'));
	// 	}
	// 	return($q.reject(response.data.message));
	// }

	// function handleError(response) {
	// 	return(response.data);
	// }

	// return $resource(apiBaseUrl + 'user/connect/', null, {
	// 	connect: {
	// 		method: 'POST'
	// 	}
	// });

}]);
