'use strict';

/**
 * @ngdoc function
 * @name nMApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nMApp
 * Currently just a tab controller
 */
var HomeCtrl = angular.module('nMApp.controllers.home', []);

HomeCtrl.controller(
    'HomeCtrl', function ($scope, $log) {
        // DI: $filter, $state
        $scope.tabs = [
            {
                title: 'Foo',
                content: ['foo', 'bar'],
                active: false
            },
            {
                title: 'Bar',
                content: ['Stuff', 'Things'],
                active: false
            },
            {
                title: 'Can',
                content: 'Haz',
                active: true
            }
        ];

        $scope.name_to_class = {
            'Foo': 'fa fa-university fa-5x',
            'Bar': 'fa fa-graduation-cap fa-5x',
            'Can': 'fa fa-heart fa-5x'
        };

        $scope.isType = function (variable, type) {
            return typeof variable === type;
        };

        $scope.activateOnly = function (selection) {
            for (var i = $scope.tabs.length; i > -1; i--)
                if (typeof $scope.tabs[i] !== 'undefined')
                    $scope.tabs[i].active = $scope.tabs[i].title === selection;

            $log.info("You'll need to uncomment this and setup your nested routes to get it to work");
            //$state.go("promo." + $filter('lowercase')($scope.currentSelection()));
        };

        $scope.currentSelection = function () {
            for (var i = $scope.tabs.length; i > -1; i--)
                if (typeof $scope.tabs[i] !== 'undefined' && $scope.tabs[i].active)
                    return $scope.tabs[i].title;
            return null; // Nothing selected
        };
    }
);
