app.factory('TilesFactory', ['$resource', 'apiBaseUrl', function($resource, apiBaseUrl){
	// return {
	// 	getLocalTiles : function(maxxtiles, maxytiles, maxx, maxy, currentx, currenty, callback) {
	// 		$http({
	// 			method: 'GET',
	// 			url: 'http://localhost:3000/matrix-tiles/' + maxx + '/' + maxy + '/' + x + '/' + y + '/',
	// 		}).then(function(response) {
	// 			callback(response.data, response.status);
	// 		},function(response) {
	// 			callback(response.data, response.status);
	// 		});
	// 	},
	// };

	return $resource(apiBaseUrl + 'tile/', null, {
		getLocalTiles: {
			method: 'GET',
			url: apiBaseUrl + 'localtiles/:gridmapid/:maxx/:maxy/:currentx/:currenty/',
			params: {format: 'json'}
			// isArray: true
		}
	});

}]);
