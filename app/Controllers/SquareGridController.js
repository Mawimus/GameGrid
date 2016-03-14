app.controller('SquareGridController', function ($scope, TilesFactory) {

	$scope.tiles = [[]];

	// nombre de tuiles (pleines) max à afficher
	$scope.maxx = 7;
	$scope.maxy = $scope.maxx;

	// Coordonnée d'affichage : valeurs par default
	$scope.currentx = 0;
	$scope.currenty = 0;
	resetMapCoord();

	// Taille max du tableau
	$scope.maxxTiles = 65; // 32
	$scope.maxyTiles = $scope.maxxTiles;

	// Récupération du design des tuiles
	// makeMap();
	$scope.tileInfo = {};

	$scope.$watch('[currentx, currenty]', makeMap, true);

	// Controle de la map avec les flèches
	$scope.navMapMoveReset = function() {
		resetMapCoord();
	}
	$scope.navMapMoveToUp = function() {
		// Y axis
		// if ($scope.currenty > 0) $scope.currenty--;
		if ($scope.currentx > 0) $scope.currentx--;
	}
	$scope.navMapMoveToRight = function() {
		// X axis
		// if ($scope.currentx < $scope.maxxTiles - $scope.maxx) $scope.currentx++;
		if ($scope.currenty < $scope.maxyTiles - $scope.maxy) $scope.currenty++;
	}
	$scope.navMapMoveToDown = function() {
		// Y axis
		// if ($scope.currenty < $scope.maxyTiles - $scope.maxy) $scope.currenty++;
		if ($scope.currentx < $scope.maxxTiles - $scope.maxx) $scope.currentx++;
	}
	$scope.navMapMoveToLeft = function() {
		// X axis
		// if ($scope.currentx > 0) $scope.currentx--;
		if ($scope.currenty > 0) $scope.currenty--;
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


	$scope.tileShowInfo = function(id) {
		// chargement des infos de la tuile sélectionnée dans la modale
		$('.spinner').show();
		$('.tile-info').hide();
		$('#modalTileInfo').modal('show');

		// var matrixTileIndex = _.findIndex(_.flatten($scope.tilesInfo), {id: id});
		// console.log('matrixTileIndex %s', matrixTileIndex);

		// $scope.tileInfo = $scope.tilesInfo[x][y];
		$scope.tileInfo = _.first(_.filter(_.flatten($scope.tiles), {id: id}));

		$('.spinner').hide();
		$('.tile-info').show();
		console.log($scope.tileInfo);

	};


	$scope.resetTileInfo = function() {
		// Vider les infos de la modale
		$scope.tileInfo = {};
	}

	$scope.tileEnter = function() {
		// Entrer dans la tuile
		// Uniquement si elle appartient au joueur
		console.log('Enter Action');
	}

	$scope.tileHelp = function() {
		// Aider la tuile
		// Uniquement si elle appartient à un allié
		console.log('Help Action');
	}

	$scope.tilePock = function() {
		// Faire un signe de vie à la tuile
		// Uniquement si elle appartient à un joueur neutre
		console.log('Pock Action');
	}

	$scope.tileAttack = function() {
		// Attaquer la tuile
		// Uniquement si elle appartient à un enemie
		console.log('Attack Action');
	}

	$scope.tileRaid = function() {
		// Lancer un raid sur la tuile
		// Uniquement si elle appartient à un barbare
		console.log('Raid Action');
	}

	$scope.tileExplore = function() {
		// Lancer une exploration sur la tuile
		// Uniquement si elle appartient à personne -> à la nature
		console.log('Explore Action');
	}


	function resetMapCoord() {
		$scope.currentx = 0;
		$scope.currenty = 0;
		// $scope.currentx = Math.ceil(($scope.maxx * -1) / 2);
		// $scope.currenty = Math.ceil(($scope.maxy * -1) / 2);
		// $scope.currentx = -2;
		// $scope.currenty = -2;
	}


	function makeMap() {
		// $scope.tiles = matrix($scope.maxx, $scope.maxy, $scope.currentx, $scope.currenty, $scope.maxxTiles, $scope.maxyTiles, $scope.tilesInfo);
		getMatrixTiles(function(tiles) {
			$scope.tiles = tiles;
		});
	}

	function matrix(maxx, maxy, x, y, maxxTiles, maxyTiles, matrixTiles) {
		console.log('makemap');

		// Controle x et y
		if (x > maxxTiles - maxx) {
			x = maxxTiles - maxx;
			$scope.currentx = x;
			return;
		}
		if (x < 0) {
			x = 0;
			$scope.currentx = x;
			return;
		}
		if (y > maxyTiles - maxy) {
			y = maxyTiles - maxy;
			$scope.currenty = y;
			return;
		}
		if (y < 0) {
			y = 0;
			$scope.currenty = y;
			return;
		}

		// code from here http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
		var arr = [[]];

		// Creates all lines:
		for (var j = 0; j < maxy; j++) {
			// Creates an empty line
			arr[j] = [];

			// Adds maxx to the empty line:
			arr[j] = new Array(maxx);

			for (var i = 0; i < maxx; i++) {
				// Initializes:
				// console.log('i %s', i);
				if (typeof matrixTiles != 'undefined') {
					// Le tableau et tab[y][x]
					arr[j][i] = matrixTiles[j][i];
				}
				 else {
				 	return;
				 }
			}
		}

		return arr;
	}

	function getMatrixTiles(callback) {
		console.log('getMatrixTiles');

		var tiles = [[]];
		var maxx, maxy, currentx, currenty, maxxTiles, maxyTiles;
		maxx = parseInt($scope.maxx);
		maxy = parseInt($scope.maxy);
		currentx = parseInt($scope.currentx);
		currenty = parseInt($scope.currenty);
		maxxTiles = parseInt($scope.maxxTiles);
		maxyTiles = parseInt($scope.maxyTiles);

		console.log('(%s | %s)', currentx, currenty);

		for (var j = 0; j < maxy; j++) {
			tiles[j] = [];
			tiles[j] = new Array(maxx);
		}

		var dataSend = {maxxtiles: maxxTiles, maxytiles: maxyTiles, maxx: maxx, maxy: maxy, currentx: currentx, currenty: currenty};
		TilesFactory.get(dataSend, function(data) {
			angular.extend(tiles, data.matrixTiles);
			tiles = data.matrixTiles;
			if (typeof callback === 'function') {
				callback(tiles);
			}
		});
	}

});
