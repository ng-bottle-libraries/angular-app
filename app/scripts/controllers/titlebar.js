'use strict';

/**
 * @ngdoc function
 * @name nMApp.controller:TitleBarCtrl
 * @description
 * # TitleBarCtrl
 * Controller of the nMApp
 * Gives the titlebar access to variables
 */
var TitleBarCtrl = angular.module('nMApp.controllers.titlebar', ['userAccessFactory', 'userService']);

TitleBarCtrl.controller('TitleBarCtrl', function($scope, $rootScope, $log, $cookies, $state, UserAccess, User) {
    $scope.isLoggedIn = User.is_logged_in();
    $scope.logout = function() {
        User.logout();
    };
    $rootScope.$on('$stateChangeStart', function() {
        $scope.isLoggedIn = User.is_logged_in();
    });
    $scope.$watch(
        function() {
            return $cookies.access_token;
        },
        function(newValue) {
            if (!newValue) $scope.isLoggedIn = false;
        }
    );
});
