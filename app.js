var app = angular.module('gamegrid', []);

app.controller('GridController', ['$scope', function ($scope) {

	$scope.tiles = [
		[]
	];

	// Affichage Max
	$scope.maxx = 3 // 32 $scope.sizes[0];
	$scope.maxy = 3 // 32 $scope.sizes[0];

	// Coordonnée d'affichage
	$scope.currentx = 0; // $scope.width / 2;
	$scope.currenty = 0; // $scope.length / 2;

	// Taille max du tableau
	$scope.maxxTiles = 32;
	$scope.maxyTiles = 32;

	// Récupération du design des tuiles
	$scope.tilesInfo = matrixTiles($scope.maxxTiles, $scope.maxyTiles);

	$scope.$watch('[currentx, currenty]', makeMap, true);



	function makeMap() {
		$scope.tiles = matrix($scope.maxx, $scope.maxy, $scope.currentx, $scope.currenty, $scope.maxxTiles, $scope.maxyTiles, $scope.tilesInfo);
	}

	function matrix(maxx, maxy, x, y, maxxTiles, maxyTiles, matrixTiles) {

		console.log('x : %s', x);
		console.log('y : %s', y);
		console.log('**********');

		// Controle x et y
		if (x > maxxTiles) {
			x = maxxTiles;
			$scope.currentx = x;
		}
		if (x < 0) {
			x = 0;
			$scope.currentx = x;
		}
		if (y > maxyTiles) {
			y = maxyTiles;
			$scope.currenty = y;
		}
		if (y < 0) {
			y = 0;
			$scope.currenty = y;
		}

		var startx = 0;
		var starty = 0;
		if (x > 0) {
			startx = 1;
		}
		if (y > 0) {
			starty = 1;
		}

		// code from here http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
		var arr = [[]];

		// Creates all lines:
		for (var j = 0; j <= maxy; j++) {
			// Creates an empty line
			arr[j] = [];

			// Adds maxx to the empty line:
			arr[j] = new Array(maxx + 1);

			for (var i = 0; i <= maxx; i++) {
				// Initializes:
				arr[j][i] = {coord: {x: i + x, y: j + y}, info: matrixTiles[i + x][j + y]};
			}
		}

		return arr;
	}

	function matrixTiles(maxxTiles, maxyTiles) {
		var tiles = [[]];

		for (var i = 0; i <= maxyTiles; i++) {
			tiles[i] = [];
			tiles[i] = new Array(maxxTiles);
		}

		tiles[0][0] = {id:11, cell: {x:1, y:1, j:1, s:1}};
		tiles[1][0] = {id:21, cell: {x:2, y:1, j:3, s:2}};
		tiles[2][0] = {id:31, cell: {x:3, y:1, j:3, s:3}};
		tiles[3][0] = {id:41, cell: {x:4, y:1, j:3, s:1}};
		tiles[4][0] = {id:51, cell: {x:5, y:1, j:3, s:1}};

		tiles[0][1] = {id:12, cell: {x:1, y:2, j:3, s:4}};
		tiles[1][1] = {id:22, cell: {x:2, y:2, j:2, s:5}};
		tiles[2][1] = {id:32, cell: {x:3, y:2, j:2, s:2}};
		tiles[3][1] = {id:42, cell: {x:4, y:2, j:2, s:3}};
		tiles[4][1] = {id:52, cell: {x:5, y:2, j:2, s:3}};

		tiles[0][2] = {id:13, cell: {x:1, y:3, j:2, s:3}};
		tiles[1][2] = {id:23, cell: {x:2, y:3, j:3, s:3}};
		tiles[2][2] = {id:33, cell: {x:3, y:3, j:1, s:2}};
		tiles[3][2] = {id:43, cell: {x:4, y:3, j:3, s:2}};
		tiles[4][2] = {id:53, cell: {x:5, y:3, j:3, s:2}};

		tiles[0][3] = {id:14, cell: {x:1, y:4, j:3, s:4}};
		tiles[1][3] = {id:24, cell: {x:2, y:4, j:3, s:4}};
		tiles[2][3] = {id:34, cell: {x:3, y:4, j:1, s:5}};
		tiles[3][3] = {id:44, cell: {x:4, y:4, j:3, s:1}};
		tiles[4][3] = {id:55, cell: {x:5, y:4, j:3, s:1}};

		tiles[0][4] = {id:15, cell: {x:1, y:5, j:3, s:4}};
		tiles[1][4] = {id:25, cell: {x:2, y:5, j:3, s:4}};
		tiles[2][4] = {id:35, cell: {x:3, y:5, j:1, s:5}};
		tiles[3][4] = {id:45, cell: {x:4, y:5, j:3, s:1}};
		tiles[4][4] = {id:55, cell: {x:5, y:5, j:3, s:1}};

		return tiles;
	}


	// Controle de la map avec les flèches
	$scope.navMapMoveReset = function() {
		$scope.currentx = $scope.currenty = 0;
	}
	$scope.navMapMoveToUp = function() {
		$scope.currenty--;
		// $scope.tiles = matrix($scope.maxx, $scope.maxy, $scope.currentx, $scope.currenty--, $scope.maxxTiles, $scope.maxyTiles, $scope.tilesInfo);
	}
	$scope.navMapMoveToRight = function() {
		$scope.currentx++;
		// $scope.tiles = matrix($scope.maxx, $scope.maxy, $scope.currentx++, $scope.currenty, $scope.maxxTiles, $scope.maxyTiles, $scope.tilesInfo);
	}
	$scope.navMapMoveToDown = function() {
		$scope.currenty++;
		// $scope.tiles = matrix($scope.maxx, $scope.maxy, $scope.currentx, $scope.currenty++, $scope.maxxTiles, $scope.maxyTiles, $scope.tilesInfo);
	}
	$scope.navMapMoveToLeft = function() {
		$scope.currentx--;
		// $scope.tiles = matrix($scope.maxx, $scope.maxy, $scope.currentx--, $scope.currenty, $scope.maxxTiles, $scope.maxyTiles, $scope.tilesInfo);
	}

	// http://stackoverflow.com/questions/25464579/is-it-possible-to-listen-for-arrow-keyspress-using-ng-keypress
	// http://jsfiddle.net/ve49dc0r/3/
	$scope.navMapMoveKeyPress = function($event) {
		// console.log($event.keyCode);

		if ($event.keyCode == 38) {
			$scope.navMapMoveToUp();
		}
		else if ($event.keyCode == 39) {
			$scope.navMapMoveToRight();
		}
		else if ($event.keyCode == 40) {
			$scope.navMapMoveToDown();
		}
		else if ($event.keyCode == 37) {
			$scope.navMapMoveToLeft();
		}
	}



	makeMap();

}]);
