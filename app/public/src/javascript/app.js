var app = angular.module("app", ["ngRoute", "appController"]).service("dbDataService", function($http) {
    var promise, service = {
        getRecipes: function() {
            return promise || (promise = $http.get("/api/drinks/").then(function($http) {
                return $http.data
            })), promise
        },
        getRecipe: function(promise) {
            return recipe = $http.get("/api/drinks/" + promise).then(function($http) {
                return $http.data
            })
        }
    };
    return service
}); 

app.config(["$routeProvider",
    function(a) {
        a.when("/", {
            templateUrl: "templates/recipes.html",
            controller: "RecipeListController"
        }).when("/:itemId", {
            templateUrl: "templates/item.html",
            controller: "RecipeItemController"
        })
    }
]);