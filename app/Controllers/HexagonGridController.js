app.controller('SquareGridController', ['$scope', function ($scope) {

	$scope.tiles = [
		[]
	];

	// nombre de tuiles (pleines) max à afficher
	$scope.maxx = 5 // 32 $scope.sizes[0];
	$scope.maxy = 5 // 32 $scope.sizes[0];

	// Coordonnée d'affichage : valeurs par default
	$scope.currentx = Math.ceil(($scope.maxx * -1) / 2);
	$scope.currenty = Math.ceil(($scope.maxy * -1) / 2);

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

		// Controle x et y
		if (x > maxxTiles - maxx + 1) {
			x = maxxTiles - maxx + 1;
			$scope.currentx = x;
		}
		if (x < maxxTiles * -1) {
			x = maxxTiles * -1;
			$scope.currentx = x;
		}
		if (y > maxyTiles - maxy + 1) {
			y = maxyTiles - maxy + 1;
			$scope.currenty = y;
		}
		if (y < maxyTiles * -1) {
			y = maxyTiles * -1;
			$scope.currenty = y;
		}

		// Gestion de la fin de map
		var startx = 0;
		var starty = 0;
		if (x == maxxTiles - maxx + 1) {
			startx = 1;
		}
		if (y == maxyTiles - maxy + 1) {
			starty = 1;
		}

		// code from here http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
		var arr = [[]];

		// Creates all lines:
		for (var j = 0; j < maxy - starty + 1; j++) {
			// Creates an empty line
			arr[j] = [];

			// Adds maxx to the empty line:
			arr[j] = new Array(maxx - startx);

			for (var i = 0; i < maxx - startx + 1; i++) {
				// Initializes:
				arr[j][i] = {coord: {x: i + x, y: (j + y) * -1}, info: matrixTiles[i + x][(j + y) * -1]};
			}
		}

		return arr;
	}

	function matrixTiles(maxxTiles, maxyTiles) {
		var tiles = [[]];

		for (var i = maxyTiles * -1; i < maxyTiles + 1; i++) {
			tiles[i] = [];
			tiles[i] = new Array(maxxTiles * 2);
		}

		tiles[0][0] = {id:11, cell: {x:1, y:1, j:1, s:1}};
		tiles[1][0] = {id:21, cell: {x:2, y:1, j:3, s:2}};
		tiles[2][0] = {id:31, cell: {x:3, y:1, j:3, s:3}};
		tiles[3][0] = {id:41, cell: {x:4, y:1, j:3, s:1}};
		tiles[4][0] = {id:51, cell: {x:5, y:1, j:3, s:1}};

		tiles[0][1] = {id:12, cell: {x:1, y:2, j:3, s:4}};
		tiles[1][1] = {id:22, cell: {x:2, y:2, j:3, s:5}};
		tiles[2][1] = {id:32, cell: {x:3, y:2, j:3, s:2}};
		tiles[3][1] = {id:42, cell: {x:4, y:2, j:3, s:3}};
		tiles[4][1] = {id:52, cell: {x:5, y:2, j:3, s:3}};

		tiles[0][2] = {id:13, cell: {x:1, y:3, j:3, s:3}};
		tiles[1][2] = {id:23, cell: {x:2, y:3, j:3, s:3}};
		tiles[2][2] = {id:33, cell: {x:3, y:3, j:3, s:2}};
		tiles[3][2] = {id:43, cell: {x:4, y:3, j:3, s:2}};
		tiles[4][2] = {id:53, cell: {x:5, y:3, j:3, s:2}};

		tiles[0][3] = {id:14, cell: {x:1, y:4, j:3, s:4}};
		tiles[1][3] = {id:24, cell: {x:2, y:4, j:3, s:4}};
		tiles[2][3] = {id:34, cell: {x:3, y:4, j:3, s:5}};
		tiles[3][3] = {id:44, cell: {x:4, y:4, j:3, s:1}};
		tiles[4][3] = {id:55, cell: {x:5, y:4, j:3, s:1}};

		tiles[0][4] = {id:15, cell: {x:1, y:5, j:3, s:4}};
		tiles[1][4] = {id:25, cell: {x:2, y:5, j:3, s:1}};
		tiles[2][4] = {id:35, cell: {x:3, y:5, j:3, s:2}};
		tiles[3][4] = {id:45, cell: {x:4, y:5, j:3, s:3}};
		tiles[4][4] = {id:55, cell: {x:5, y:5, j:2, s:3}};

		return tiles;
	}


	// Controle de la map avec les flèches
	$scope.navMapMoveReset = function() {
		$scope.currentx = Math.ceil(($scope.maxx * -1) / 2);
		$scope.currenty = Math.ceil(($scope.maxy * -1) / 2);
	}
	$scope.navMapMoveToUp = function() {
		// Y axis
		$scope.currenty--;
		// $scope.tiles = matrix($scope.maxx, $scope.maxy, $scope.currentx, $scope.currenty--, $scope.maxxTiles, $scope.maxyTiles, $scope.tilesInfo);
	}
	$scope.navMapMoveToRight = function() {
		// X axis
		$scope.currentx++;
		// $scope.tiles = matrix($scope.maxx, $scope.maxy, $scope.currentx++, $scope.currenty, $scope.maxxTiles, $scope.maxyTiles, $scope.tilesInfo);
	}
	$scope.navMapMoveToDown = function() {
		// Y axis
		$scope.currenty++;
		// $scope.tiles = matrix($scope.maxx, $scope.maxy, $scope.currentx, $scope.currenty++, $scope.maxxTiles, $scope.maxyTiles, $scope.tilesInfo);
	}
	$scope.navMapMoveToLeft = function() {
		// X axis
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
