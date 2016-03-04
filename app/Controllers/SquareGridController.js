app.controller('SquareGridController', function ($scope, TilesFactory) {

	$scope.tiles = [[]];

	// nombre de tuiles (pleines) max à afficher
	$scope.maxx = 5;
	$scope.maxy = 5;

	// Coordonnée d'affichage : valeurs par default
	$scope.currentx = 0;
	$scope.currenty = 0;
	resetMapCoord();

	// Taille max du tableau
	$scope.maxxTiles = 32;
	$scope.maxyTiles = 32;

	// Récupération du design des tuiles
	$scope.tilesInfo = getMatrixTiles();
	$scope.tileInfo = {};

	$scope.$watch('[currentx, currenty]', getMatrixTiles, true);

	// Controle de la map avec les flèches
	$scope.navMapMoveReset = function() {
		resetMapCoord();
	}
	$scope.navMapMoveToUp = function() {
		// Y axis
		$scope.currenty--;
	}
	$scope.navMapMoveToRight = function() {
		// X axis
		$scope.currentx++;
	}
	$scope.navMapMoveToDown = function() {
		// Y axis
		$scope.currenty++;
	}
	$scope.navMapMoveToLeft = function() {
		// X axis
		$scope.currentx--;
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


	$scope.tileShowInfo = function(id, x, y) {
		// chargement des infos de la tuile sélectionnée dans la modale
		$('.spinner').show();
		$('.tile-info').hide();
		$('#modalTileInfo').modal('show');

		$scope.tileInfo = $scope.tilesInfo[x][y];

		$('.spinner').hide();
		$('.tile-info').show();
		console.log($scope.tileInfo);

	};


	$scope.resetTileInfo = function() {
		// Vider les infos de la modale
		$scope.tileInfo = {};
	}

	function resetMapCoord() {
		// $scope.currentx = Math.ceil(($scope.maxx * -1) / 2);
		// $scope.currenty = Math.ceil(($scope.maxy * -1) / 2);
		$scope.currentx = 0;
		$scope.currenty = -4;
	}


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
		for (var j = 0; j < maxy - starty; j++) {
			// Creates an empty line
			arr[j] = [];

			// Adds maxx to the empty line:
			arr[j] = new Array(maxx - startx);

			for (var i = 0; i < maxx - startx; i++) {
				// Initializes:
				if (typeof matrixTiles != 'undefined') {
					arr[j][i] = matrixTiles[i + x][(j + y) * -1];
				}
			}
		}

		return arr;
	}

	function getMatrixTiles() {
		var tiles = [[]];
		var maxx, maxy, currentx, currenty, maxxTiles, maxyTiles;
		maxx = $scope.maxx;
		maxy = $scope.maxy;
		currentx = $scope.currentx;
		currenty = $scope.currenty * -1;
		maxxTiles = $scope.maxxTiles;
		maxyTiles = $scope.maxyTiles;

		for (var i = maxyTiles * -1; i < maxyTiles + 1; i++) {
			tiles[i] = [];
			tiles[i] = new Array(maxxTiles * 2);
		}

		var dataSend = {maxx:maxx, maxy:maxy, x:currentx, y:currenty};
		TilesFactory.get(dataSend, function(data) {
			angular.extend(tiles, data.matrixTiles);
			makeMap();
			return tiles;
		});

		// TilesFactory.GetMatrixTiles(maxx, maxy, x, y, function(data, status) {
		// 	// console.log('data: %o', data);
		// 	// console.log('status: %s', status);
		// 	// tiles = data;
		// 	angular.extend(tiles, data);
		// 	// console.log('tiles : %o', tiles);

		// 	makeMap();
		// 	return tiles;
		// });

		return tiles;
	}

});
