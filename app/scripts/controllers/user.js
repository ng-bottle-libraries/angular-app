'use strict';

/**
 * @ngdoc function
 * @name nMApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the nMApp
 * Enables user to login/register
 */
var UserCtrl = angular.module('nMApp.controllers.user', ['userAccessFactory', 'userService']);

UserCtrl.controller('UserCtrl', function ($scope, $log, User) {
    $scope.user = {};

    $scope.login_or_register = function () {
        User.login_or_register($scope.user);  // Redirect user to `profile` state on success
    };
});
