app.directive('recipeImage', function() {
  return {
  	restrict: 'A',
    link: function(scope, element, attrs) {
    	function preLoadImage(src) {
            var image = new Image();
            $.get(src).done(function() { 
                image.src = src;
                appendImage(image);

            }).fail(function() { 
                image.src = "resources/images/default-image.png";
                appendImage(image);
            });
        }
        function appendImage(image) {
                element.append(image);
    	}
    	attrs.$observe('recipeImage', function(value) {
    		if (value != '') {
    			preLoadImage(value);
    		}
    	});
    }
  };
});