app.factory('TilesFactory', function($resource){
	// return {
	// 	GetMatrixTiles : function(maxx, maxy, x, y, callback) {
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

	var apiUrl = 'http://localhost:3000';

	return $resource(apiUrl + '/matrix-tiles/:maxx/:maxy/:x/:y/');

});
