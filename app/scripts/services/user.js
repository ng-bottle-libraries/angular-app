'use strict';

var UserService = angular.module('userService', ['userAccessFactory']);

UserService.service('User', function ($http, $log, $cookies, $state, UserAccess) {
    // Private
    function set_access_token_everywhere (token) {
        if (token === '') {
            delete $cookies.access_token;
            delete $http.defaults.headers.common['Auth-Token'];
            UserAccess.user().access_token = token;
            return;
        }
        $cookies.access_token = UserAccess.user().access_token = $http.defaults.headers.common['Auth-Token'] = token;
    }

    function redirect (uri, not_uri_then) {
        switch (typeof uri) {
            case 'string':
                if (uri.length) $state.go(uri);
                break;
            case 'undefined':
                $state.go(not_uri_then || 'profile');
            // default: don't redirect
        }
    }

    function deal_with_token_success (custom_redirect) {
        return function (data) {
            set_access_token_everywhere(data.access_token);
            redirect(custom_redirect);
        }
    }

    function log_data_status (function_name) {
        return function (data, status) {
            $log.error(function_name, "data = " + data + ", status = " + status);
        }
    }

    function logout_handler (custom_redirect) {
        return function (data, status) {
            log_data_status('logout')(data, status);
            set_access_token_everywhere('');
            redirect(custom_redirect, 'main');
        }
    }

    // Public

    // Set `custom_redirect` to false or null to stop redirect
    this.register = function (auth_details, custom_redirect) {
        var user = UserAccess.user();
        var payload = { email: auth_details.email || user.email, password: auth_details.password || user.password };

        if (typeof auth_details.meta !== 'undefined' && auth_details.meta !== null && auth_details.meta.length)
            payload.meta = auth_details.meta;

        $http({ url: '/api/oauth2/register', method: 'PUT', data: payload }
        ).success(deal_with_token_success(custom_redirect)).error(log_data_status('register'));

        user.password = ''; // Slight security measure
    };
    this.login = function (auth_details, custom_redirect) {
        var user = UserAccess.user();

        // We do want to login again even if user has access_token: they get new expiry
        $http({
                  url: '/api/oauth2/login', method: 'GET',
                  data: {
                      email: auth_details.email || user.email,
                      password: auth_details.password || user.password,
                      grant_type: auth_details.grant_type || 'password'
                  }
              }
        ).success(deal_with_token_success(custom_redirect)).error(log_data_status('login'));

        user.password = ''; // Slight security measure
    };
    this.login_or_register = function (auth_details, custom_redirect) {
        $http.post('/api/oauth2/register_or_login', auth_details
        ).success(deal_with_token_success(custom_redirect)).error(log_data_status('login_or_register'));
    };
    this.test_access = function () {
        $log.warn("Error: not implemented");
    };
    this.is_logged_in = function () {
        // Has side-effects of setting tokens everywhere
        if (!$cookies.access_token) return false;
        set_access_token_everywhere($cookies.access_token);
        return true;
    };
    this.logout = function (custom_redirect) {
        $http({
                  url: '/api/oauth2/logout', method: 'DELETE',
                  data: { access_token: UserAccess.user().access_token }
              }
        ).then(logout_handler(custom_redirect), logout_handler(custom_redirect))
    };
});
