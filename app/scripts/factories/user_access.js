'use strict';

/**
 * @ngdoc function
 * @name userAccessFactory
 * @description
 * # UserFactory
 * Inject this factory into areas where a user's access token is required
 */
var UserAccess = angular.module('userAccessFactory', []);

UserAccess.factory('UserAccess', function () {
    var _user = { access_token: '' };

    return {
        // Get current user
        user: function () {
            return _user;
        }
    };
});
