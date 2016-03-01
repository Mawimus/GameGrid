app.controller('SquareGridController', ['$scope', function ($scope) {

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
	$scope.tilesInfo = matrixTiles($scope.maxxTiles, $scope.maxyTiles);
	$scope.tileInfo = {};

	$scope.$watch('[currentx, currenty]', makeMap, true);

	makeMap();


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

	}

	function resetMapCoord() {
		$scope.currentx = Math.ceil(($scope.maxx * -1) / 2);
		$scope.currenty = Math.ceil(($scope.maxy * -1) / 2);
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
				arr[j][i] = matrixTiles[i + x][(j + y) * -1];
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

		tiles[0][0] = {id:11, coord: {x:0, y:0}, owner: {id:1, type:'player', name:'Mawimus', class:'roman'}, field: {type:'mountain'}};
		tiles[1][0] = {id:21, coord: {x:1, y:0}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'forest'}};
		tiles[2][0] = {id:31, coord: {x:2, y:0}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'desert'}};
		tiles[3][0] = {id:41, coord: {x:3, y:0}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'mountain'}};
		tiles[4][0] = {id:51, coord: {x:4, y:0}, owner: {id:0, type:'ally', name:'Poudjik', class:'Egyptien'}, field: {type:'mountain'}};

		tiles[0][1] = {id:12, coord: {x:0, y:1}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'sea'}};
		tiles[1][1] = {id:22, coord: {x:1, y:1}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'lowland'}};
		tiles[2][1] = {id:32, coord: {x:2, y:1}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'forest'}};
		tiles[3][1] = {id:42, coord: {x:3, y:1}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'desert'}};
		tiles[4][1] = {id:52, coord: {x:4, y:1}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'desert'}};

		tiles[0][2] = {id:13, coord: {x:0, y:2}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'desert'}};
		tiles[1][2] = {id:23, coord: {x:1, y:2}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'desert'}};
		tiles[2][2] = {id:33, coord: {x:2, y:2}, owner: {id:0, type:'barbarian', name:'Barbarian', class:'barbarian'}, field: {type:'forest'}};
		tiles[3][2] = {id:43, coord: {x:3, y:2}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'forest'}};
		tiles[4][2] = {id:53, coord: {x:4, y:2}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'forest'}};

		tiles[0][3] = {id:14, coord: {x:0, y:3}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'sea'}};
		tiles[1][3] = {id:24, coord: {x:1, y:3}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'sea'}};
		tiles[2][3] = {id:34, coord: {x:2, y:3}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'lowland'}};
		tiles[3][3] = {id:44, coord: {x:3, y:3}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'mountain'}};
		tiles[4][3] = {id:55, coord: {x:4, y:3}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'mountain'}};

		tiles[0][4] = {id:15, coord: {x:0, y:4}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'sea'}};
		tiles[1][4] = {id:25, coord: {x:1, y:4}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'mountain'}};
		tiles[2][4] = {id:35, coord: {x:2, y:4}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'forest'}};
		tiles[3][4] = {id:45, coord: {x:3, y:4}, owner: {id:0, type:'nature', name:'Nature', class:'nature'}, field: {type:'desert'}};
		tiles[4][4] = {id:55, coord: {x:4, y:4}, owner: {id:2, type:'enemy',  name:'Ququ', class:'gallic'}, field: {type:'desert'}};

		return tiles;
	}

}]);
