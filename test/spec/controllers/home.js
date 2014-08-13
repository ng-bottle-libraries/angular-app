'use strict';

describe('Controller: HomeCtrl', function () {
    beforeEach(module('nMApp.controllers.home'));

    it('should attach tabs list to scope', inject(function ($controller) {
        var scope = {},
            ctrl = $controller('HomeCtrl', {$scope: scope});

        expect(scope.tabs.length).toBe(3);
    }));
});
