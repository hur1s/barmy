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