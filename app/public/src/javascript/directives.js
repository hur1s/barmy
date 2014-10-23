app.directive('helloWorld', function() {
  return {
    restrict: 'AE',
    replace: true,
    template: '<p style="background-color:{{color}}">Hello World',
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        elem.css('background-color', 'white');
        scope.$apply(function() {
          scope.color = "white";
        });
      });
      elem.bind('mouseover', function() {
        elem.css('cursor', 'pointer');
      });
    }
  };
});

app.directive('recipeImage', function() {
  return {
  	restrict: 'A',
    link: function(scope, element, attrs) {
    	function appendImage(src) {
    		var image = new Image();
    		image.onload = function () {
    			if (this.height != 0) {
    				element.append(image);
    			}
    		}
    		image.src = src;
    	}
    	attrs.$observe('recipeImage', function(value) {
    		if (value != '') {
    			appendImage(value);
    		}
    	});
    }
  };
});