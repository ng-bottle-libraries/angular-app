'use strict';

/**
 * @ngdoc function
 * @name nMApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the nMApp
 * Facilitates profile access + modification for currently logged in user
 */
var ProfileCtrl = angular.module('nMApp.controllers.profile', ['userService', 'userAccessFactory']);

ProfileCtrl.controller('ProfileCtrl', function($scope, $state, User, UserAccess) {
    $scope.user = UserAccess.user();
    if (!User.is_logged_in()) $state.go('login_or_register');
});
