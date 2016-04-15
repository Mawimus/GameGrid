app.directive('match', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function (scope, iElement, iAttrs, iCtrl) {
			// if ngModel is not defined, we don't need to do anything
			if (!iCtrl) return;
			if (!iAttrs['match']) return;

			var firstField = $parse(iAttrs['match']);

			var validator = function(value) {
				var temp = firstField(scope),
					v = value === temp;
				iCtrl.$setValidity('match', v);
				return value;
			}

			iCtrl.$parsers.unshift(validator);
			iCtrl.$formatters.push(validator);
			scope.$watch(iAttrs['match'], function() {
				validator(iCtrl.$viewValue);
			});
		}
	};
}]);
