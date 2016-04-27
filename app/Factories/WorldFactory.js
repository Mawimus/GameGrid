app.factory('WorldFactory', ['$http', '$q', '$resource', 'apiBaseUrl', function ($http, $q, $resource, apiBaseUrl) {


	return ({
		getWorlds: getWorlds
	});

	function getWorlds() {
		var request = $http({
			method: 'GET',
			url: apiBaseUrl + 'worlds/0/0',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});

		return request;
	}

}])
