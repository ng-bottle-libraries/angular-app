'use strict';

/**
 * @ngdoc overview
 * @name nameSpaceApp
 * @description
 * # nameSpaceApp
 *
 * Main module of the application.
 */
var nMApp = angular.module('nameSpaceApp', [
    /* 'ngAnimate', 'ngResource', 'ngSanitize', 'ngTouch' */
    'ngCookies',
    'ui.router', //'ui.bootstrap', 'mgcrea.ngStrap'
    'nMApp.controllers.titlebar', 'nMApp.controllers.home',
    'nMApp.controllers.user', 'nMApp.controllers.profile',
    'nMApp.controllers.logout'
]);

// routes / states
nMApp.config(
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('main', {
                       url: "/",
                       templateUrl: '/views/home.html',
                       controller: 'HomeCtrl'
                   })
            .state('login_or_register', {
                       url: "/login_or_register",
                       templateUrl: "/views/login_or_register.html",
                       controller: 'UserCtrl'
                   })
            .state('logout', {
                       template: 'Logging out...',
                       controller: 'LogoutCtrl'
                   })
            .state('profile', {
                       url: "/profile",
                       templateUrl: "/views/profile.html",
                       controller: 'ProfileCtrl'
                   })
    }
);

nMApp.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});

nMApp.config(function ($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('/');
});

/* CORS */
nMApp.config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
