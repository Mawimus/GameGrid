app.factory('UserFactory', ['$http', '$q', '$resource', 'apiBaseUrl', function($http, $q, $resource, apiBaseUrl) {

	return ({
		connection: connection,
		create: create
	});

	function connection(params) {
		var request =  $http({
			method: 'POST',
			url: apiBaseUrl + 'user/connect/',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			data: params
		});

		return request;
	}

	function create(params) {
		var request = $http({
			method: 'POST',
			url: apiBaseUrl + 'user/',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			data: params
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
