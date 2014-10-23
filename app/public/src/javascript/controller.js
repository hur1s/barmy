var appController = angular.module('appController', []);

appController.controller("FolioListController", ['dbDataService', '$scope',
    function(dbDataService, $scope) {
		dbDataService.getRecipes().then(function(response) {
			$scope.recipes = response.recipes;
		});

    	$scope.orderProp = '-recipeId';
    }
]);

appController.controller('FolioItemController', ['dbDataService', '$scope', '$routeParams',
	function(dbDataService, $scope, $routeParams) {
        $scope.id = $routeParams.itemId;
        dbDataService.getRecipe($routeParams.itemId).then(function(response) {
            $scope.recipe = response;
            $scope.imageUrl = 'resources/recipe-images/cocktail-big-' + $scope.recipe.recipeId + '.jpg';
        });      
}]);