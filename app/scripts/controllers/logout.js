'use strict';

/**
 * @ngdoc function
 * @name nMApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the nMApp
 * Logs out user
 */
angular.module('nMApp.controllers.logout', ['userService']).controller('LogoutCtrl', function (User) {
    User.logout();
});
