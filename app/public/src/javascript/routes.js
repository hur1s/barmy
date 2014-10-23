//old

define(['app', 'controller'], function (app) {
  return app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {controller: 'controller', templateUrl: '/templates/List.html'});
  }]);
});