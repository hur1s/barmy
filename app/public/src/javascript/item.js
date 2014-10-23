//old

define(['app'], function (app) {
  mainApp.factory('item', ['$resource', function ($resource) {
    return $resource('/item/:id', {id: '@id'});
  }]);
});